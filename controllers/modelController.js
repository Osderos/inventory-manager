const Model = require("../models/model");

exports.index = function (req, res) {
  res.send("Not implemented: site home page");
};

exports.model_list = function (req, res) {
  res.send("Not Implemented: models list");
};

exports.model_detail = function (req, res) {
  res.send("Not implemented: model detail:" + req.params.id);
};

exports.model_create_get = function (req, res) {
  res.send("Not implemented: model create get");
};

exports.model_create_post = function (req, res) {
  res.send("Not implemented: model create post");
};

exports.model_delete_get = function (req, res) {
  res.send("Not implmented: model delete get");
};

exports.model_delete_post = function (req, res) {
  res.send("Not implmented: model delete post");
};

exports.model_update_get = function (req, res) {
  res.send("Not implmented: model update get");
};

exports.model_update_post = function (req, res) {
  res.send("Not implmented: model update post");
};
