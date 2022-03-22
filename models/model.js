const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  name: { type: String, required: true, minlength: 3, setMaxListeners: 20 },
  scale: { type: Schema.Types.ObjectId, ref: "Scale", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, require: true },
});

ModelSchema.virtual("url").get(function () {
  "/catalog/model" + this._id;
});

module.exports = mongoose.model("Model", ModelSchema);
