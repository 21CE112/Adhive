import avatarApi from "../images/avatars";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { toast } from "react-hot-toast";
async function fetchUsername() {
  let result = await fetch("http://localhost:3000/userData", {
    method: "post",
    body: JSON.stringify({ token: window.localStorage.getItem("token") }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  result = await result.json();
  if (result === "Token expired") {
    // return "hello";
    prompt("toek experied login");
    return toast.error("Login again..!!");
  } else {
    console.log(result.username);
    return result.username;
  }
}
let dummycontents = {
  user: {
    name: "",
    title: "Administrator",
    avatar: avatarApi[6],
    status: "online",
  },
  text: {
    title: "Lorem ipsum",
    subtitle: "Ut a lorem eu odio cursus laoreet.",
    sentences:
      "Donec lacus sem, scelerisque sed ligula nec, iaculis porttitor mauris.",
    paragraph:
      "Sed rutrum augue libero, id faucibus quam aliquet sed. Phasellus interdum orci quam, volutpat ornare eros rhoncus sed. Donec vestibulum leo a auctor convallis. In dignissim consectetur molestie. Vivamus interdum tempor dui, nec posuere augue consequat sit amet. Suspendisse quis semper quam. Nullam nec neque sem.",
    date: "Jan 9, 2018",
  },
};
let result1 = fetchUsername()
  .then((value) => {
    dummycontents.user.name = value;
  })
  .catch((error) => console.log(error));
// console.log(result1);
// fetchUsername()
//   .then((value) => console.log(value))
//   .catch((error) => console.log(error));
// result1.then((value) => {
//   console.log(value);
//   var hello = value;
//   console.log(hello);
// });

export default dummycontents;