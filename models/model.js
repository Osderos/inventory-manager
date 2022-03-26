const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  scale: { type: String, required: true, minlength: 3, maxlength: 10 },
  price: { type: Number, require: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Sold"],
    default: "Available",
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  picture: { type: String, required: false },
});

ModelSchema.virtual("url").get(function () {
  return "/catalog/model/" + this._id;
});

module.exports = mongoose.model("Model", ModelSchema);
