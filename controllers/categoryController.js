const Category = require("../models/category");
const Model = require("../models/model");

const async = require("async");

exports.category_list = function (req, res, next) {
  Category.find().exec(function (err, list_categories) {
    if (err) {
      return next(err);
    }
    res.render("category_list", {
      title: "All Categories",
      category_list: list_categories,
    });
  });
};

exports.category_detail = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_models: function (callback) {
        Model.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      res.render("category_detail", {
        title: "Category detail",
        category: results.category,
        category_models: results.category_models,
      });
    }
  );
};

exports.category_create_get = function (req, res) {
  res.send("Not implemented: category create get");
};

exports.category_create_post = function (req, res) {
  res.send("Not implemented: category create post");
};

exports.category_delete_get = function (req, res) {
  res.send("Not implemented: category delete get");
};

exports.category_delete_post = function (req, res) {
  res.send("Not implemented: category delete post");
};

exports.category_update_get = function (req, res) {
  res.send("Not implemented: category update get");
};

exports.category_update_post = function (req, res) {
  res.send("Not implemented: category update post");
};
