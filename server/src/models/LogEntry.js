const mongoose = require("mongoose");
const { Schema } = mongoose;
const requiredNumber = {
  type: Number,
  required: true,
};

const LogEntrySchema = new Schema(
  {
    email : {type:String,required:true},
    title: { type: String, required: true },
    description: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    visitDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LogEntry", LogEntrySchema);
