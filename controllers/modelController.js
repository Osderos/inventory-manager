const Model = require("../models/model");
const Category = require("../models/category");

const async = require("async");

const { body, validationResult } = require("express-validator");

const multer = require("multer");
// const upload = multer({dest:'/uploads/'})

exports.index = function (req, res) {
  async.parallel(
    {
      model_count: function (callback) {
        Model.countDocuments({}, callback);
      },
      category_count: function (callback) {
        Category.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Personal Models Inventory",
        error: err,
        data: results,
      });
    }
  );
};

exports.model_list = function (req, res, next) {
  Model.find()
    .sort({ category: 1 })
    .populate("category")
    .exec(function (err, list_models) {
      if (err) {
        return next(err);
      }
      res.render("model_list", {
        title: "All models",
        model_list: list_models,
      });
    });
};

exports.model_detail = function (req, res, next) {
  Model.findById(req.params.id)
    .populate("category")
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      if (results == null) {
        const err = new Error("Model not found");
        err.status = 404;
        return next(err);
      }
      res.render("model_detail", { title: results.name, model: results });
    });
};

exports.model_create_get = function (req, res, next) {
  res.render("category_form", { title: "Create Category" });
};

exports.model_create_post = [
  //Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Category name must have minimum lenght of 3")
    .isAlpha()
    .withMessage("Must contain only letters"),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .escape()
    .withMessage("Please provide a brief description of the category created"),

  //Process the request after sanitization and validation.
  (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      picture: req.body.picture,
    });
    if (!errors.isEmpty()) {
      //there are errors, render the form again with remarks considered.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      //check if category with same name exists
      Category.findOne({ name: req.body.name }).exec(function (
        err,
        found_category
      ) {
        if (err) {
          return next(err);
        }
        if (found_category) {
          res.redirect(found_category.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

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
