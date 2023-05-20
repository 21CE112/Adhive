const mongoose = require("mongoose");

const AdvertiserBookingschema = mongoose.Schema({
  companyName: {
    type: String,
  },

  companyOwnerName: {
    type: String,
  },
  companyEmail: {
    type: String,
  },
  companyContactNumber: {
    type: String,
  },

  companyAddress: {
    type: String,
  },
  adinfo: [{
    adOrientation: {
      type: String,
    },

    adType: {
      type: String,
    },
    adImage:{
      type:[String]
    },
    adCategories: {
      type: String,
    },
    adDuration: {
      type: String,
    },

    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    timeSlot: {
      type: String,
    },

    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },

    area: {
      type: [String],
    },
  }],
});

const booking = new mongoose.model("Adsbooking", AdvertiserBookingschema);

module.exports = booking;