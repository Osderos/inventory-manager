const mongoose = require("mongoose");
const model = require("./model");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    enum: ["Cars", "Planes", "Military", "Notdefined"],
    default: "Notdefined",
    required: true,
  },
  description: { type: String, required: true },
});

CategorySchema.virtual("url").get(function () {
  return "/catalog/category/" + this._id;
});

module.exports = mongoose.model("Category", CategorySchema);
