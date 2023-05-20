/* eslint consistent-return:0 import/order:0 */

const express = require("express");
const logger = require("./logger");
const favicon = require("serve-favicon");
const path = require("path");
const rawicons = require("./rawicons");
const rawdocs = require("./rawdocs");
const argv = require("./argv");
const port = require("./port");
const setup = require("./middlewares/frontendMiddleware");
const isDev = process.env.NODE_ENV !== "production";
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require("ngrok")
    : false;
const { resolve } = require("path");
const app = express();
// added by me
require("./Connection");
const Advertiser = require("./apis/Advertiser_schema");
const Publisher = require("./apis/Publisher_schema");
const Admin = require("./apis/Admin_Schema")
const Abooking = require("./apis/AdvertiserBookingForm_Schema");

const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwt_secret = "hekladfekjfkerwuf38726876412(0128e4871$^%I&#&@)";
const RegMail = require('./mails/Registration_mail')
// -------------------------------

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
// Load material icons

// added by me
app.use(express.json());

app.post("/signUpClient", async (req, res) => {
  // res.send("hello world..!!")
  try {
    let securePass = "";
    const salt = await bcrypt.genSalt(10);
    // const values = JSON.parse(req.body.data)
    securePass = await bcrypt.hash(req.body.data.password, salt);
    console.log(securePass);
    const data = {
      username: req.body.data.username,
      password: securePass,
      email: req.body.data.email,
      profileImage: req.body.data.profileImage,
    };
    let user = "";
    if (req.body.data.collection === "advertiserinfo") {
        user = new Advertiser(data);
        const result = await user.save();
    if (result) {
      res.send(result);
    } 
    }
     else if (req.body.data.collection === "publiserinfo") {
      
        user = new Publisher(data);
        const result = await user.save();
    if (result) {
      res.send(result);
    } 
    }
  
  } catch (err) {
    res.json("error has been occured");
    console.log("Error has been Occured..!!", err);
  } 
});

app.post("/loginUser", async (req, res) => {
  // res.send("Hello Login")
  const result = await Advertiser.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (result) {
    if(req.body.password){
    const pass = result.password;
    const ok = await bcrypt.compare(req.body.password,pass);
    if(ok){
    console.log(result);
    const token = jwt.sign({email:result.email},jwt_secret,{
      expiresIn:"3000s"
    });
    const comp = {result,token}
    console.log(comp)
    res.send(comp);
    }
    else
    {
      res.json("password not valid")
    }}
    else
    {
      res.json("found");
    }
  } else {
    // console.log("no users found\n");
    res.json("no users found");
  }
});
  
app.post('/sendmail',(req,res)=>{
  const mail = RegMail(req.body.email,req.body.otp,req.body.text);
  if(mail)
  {
    res.json("sent")
  }
  else
  {
    res.json("error")
  }
})

app.post("/loginPublisher",async(req,res)=>{
  // res.send("login publisher..!!");
  const result = await Publisher.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })

  if (result) {
    if(req.body.password){
    const pass = result.password;
    const ok = await bcrypt.compare(req.body.password,pass);
    if(ok){
    console.log(result);
    const token = jwt.sign({email:result.email},jwt_secret,{
      expiresIn:"3000s"
    });
    const comp = {result,token}
    console.log(comp)
    res.send(comp);
    }    
    else
    {
      res.json("password not valid")
    }
  } else{
    res.json("found")
  }}else {
    // console.log("no users found\n");
    res.json("no users found");
  }
});

app.post('/advertiserExist',async(req,res)=>{
  // res.send("hello...!!")
  const result = await Advertiser.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
  if(result)
  {
    res.json("Advertiser already exists..!!")
  }
  else 
  {
    res.json("no")
  }
})

app.post('/publisherExist',async(req,res)=>{
  // res.send("hello...!!")
  const result = await Publisher.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
  if(result)
  {
    res.json("Publisher already exists..!!")
  }
  else 
  {
    res.json("no")
  }
})

app.put("/resetPass",async(req,res)=>{
  // res.send("reset password..!!")
  let result=""
  let securePass = "";
    const salt = await bcrypt.genSalt(10);
    securePass = await bcrypt.hash(req.body.password, salt);
  if(req.body.collection==="loginUser") 
  {
    result = await Advertiser.updateOne({email:req.body.email},{$set:{password:securePass}})
   
  }
  else if(req.body.collection==="loginPublisher")
  {
    result = await Publisher.updateOne({email:req.body.email},{$set:{password:securePass}})
  }
  if(result)
  {
    res.json("Password Changed Successfully..!!")
  }
  else
  {
    res.json("Error while updating your password..!!")
  }
})

app.post("/adminLogin",async(req,res)=>{
  const result = await Admin.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (result) {
    if(req.body.password){
    const pass = result.password;
    const ok = await bcrypt.compare(req.body.password,pass);
    if(ok){
      const token = jwt.sign({email:result.email},jwt_secret,{
        expiresIn:"3000s"
      });
      const comp = {result,token}
      console.log(comp)
      res.send(comp);
    }  
    else
    {
      res.json("password not valid")
    }}
    else
    {
      res.json("found");
    }
  } else {
    // console.log("no users found\n");
    res.json("no users found");
  }
})

app.post("/userData", async (req, res) => {
  const token = req.body.token;
  try {
    const user = jwt.verify(token, jwt_secret, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.json("Token expired");
    }
    const useremail = user.email;
    const acc = await Advertiser.findOne({ email: useremail });
    if (acc) {
      console.log(acc);
      res.send(acc);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/booking", async (req, res) => {
  try {
    const booking = {
      companyName: req.body.companyName,
      companyOwnerName: req.body.companyOwnerName,
      companyEmail: req.body.companyEmail,
      companyContactNumber: req.body.companyContactNumber,
      companyAddress: req.body.companyAddress,
      adinfo: {
        adOrientation: req.body.adOrientation,
        adType: req.body.adType,
        adImage:req.body.adImage,
        adDuration: req.body.adDuration,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        timeSlot: req.body.timeSlot,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        area: req.body.area,
      },
    };

    const adbooking = new Abooking(booking);
    const adbookingresult = await adbooking.save();

    if (adbookingresult) {
      console.log(adbookingresult);
      res.send(adbookingresult);
    }
  } catch (err) {
    console.log(err);
    res.json("Failed to Booking");
  }
});

app.get("/getAdvertisers",async(req,res)=>{
  // res.json("hello admin");
  try{
  const result = await Abooking.find();
  if(result.length>0)
  {
    console.log(result);
    res.send(result);
  }
  else
  {
    res.json("error")
  }}
  catch(e)
  {
    console.log(e);
    res.send(e);
  }

})
// Load code preview
app.use("/api/docs", (req, res) => {
  res.json({
    records: [{ source: rawdocs(req.query) }],
  });
});

app.use("/", express.static("public", { etag: false }));
app.use(favicon(path.join("public", "favicons", "favicon.ico")));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), "build"),
  publicPath: "/",
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || "localhost";

// use the gzipped bundle
app.get("*.js", (req, res, next) => {
  req.url = req.url + ".gz"; // eslint-disable-line
  res.set("Content-Encoding", "gzip");
  next();
});

// Start your app.
app.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
