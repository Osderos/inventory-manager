const Model = require("../models/model");
const Category = require("../models/category");

const async = require("async");

const { body, validationResult } = require("express-validator");

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
  Category.find().exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.render("model_form", { title: "Add New Model", categories: results });
  });
};

exports.model_create_post = [
  //Validate and sanitize fields.
  body("name")
    .exists()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Model name must have minimum lenght of 3"),
  body("scale").exists().withMessage("Scale is required").trim().escape(),
  body("price")
    .exists()
    .withMessage("Model must have a price")
    .isNumeric()
    .escape(),
  body("category").trim(),

  //Process the request after sanitization and validation.
  (req, res, next) => {
    const errors = validationResult(req);

    const receivedPath = req.file.path;
    const cleanedPath = receivedPath.slice(6);

    const model = new Model({
      name: req.body.name,
      price: req.body.price,
      scale: req.body.scale,
      status: req.body.status,
      category: req.body.category,
      picture: cleanedPath,
    });
    console.log(model);
    if (!errors.isEmpty()) {
      //there are errors, render the form again with remarks considered.

      Category.find().exec(function (err, results) {
        if (err) {
          return next(err);
        }
        res.render("model_form", {
          title: "Add New Model",
          categories: results,
          model: model,
          errors: errors.array(),
        });
      });

      return;
    } else {
      model.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(model.url);
      });
    }
  },
];

exports.model_delete_get = function (req, res, next) {
  Model.findById(req.params.id)
    .populate("category")
    .exec(function (err, model) {
      if (err) {
        return next(err);
      }
      if (model == null) {
        res.redirect("catalog/models");
      }
      res.render("model_delete", { title: "Delete Model", model: model });
    });
};

exports.model_delete_post = function (req, res, next) {
  const trimmedId = req.body.id.trim();
  Model.findByIdAndRemove(trimmedId, function deleteModel(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/catalog/models");
  });
};

exports.model_update_get = function (req, res) {
  res.send("Not implmented: model update get");
};

exports.model_update_post = function (req, res) {
  res.send("Not implmented: model update post");
};
