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
  model: { type: Schema.Types.ObjectId, ref: "Model", required: true },
});

CategorySchema.virtual("url").get(function () {
  "/catalog/category" + this._id;
});

module.exports= mongoose.model('Category', CategorySchema)
