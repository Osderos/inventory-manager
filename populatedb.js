#! /usr/bin/env node

console.log(
  "This script populates database with current items. Specified database as argument - e.g.: populatedb mongodb+srv://osderos:Oksir123@inventory.ih7oq.mongodb.net/inventory?retryWrites=true&w=majority"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const Model = require("./models/model");
const Category = require("./models/category");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const models = [];
const categories = [];

function modelCreate(name, scale, price, status, category, picture, cb) {
  modelDetail = {
    name: name,
    scale: scale,
    price: price,
    status: status,
    category: category,
    picture: picture,
  };

  const model = new Model(modelDetail);

  model.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Model: " + model);
    models.push(model);
    cb(null, model);
  });
}

function categoryCreate(name, description, picture, cb) {
  categoryDetail = {
    name: name,
    description: description,
    picture: picture,
  };

  const category = new Category(categoryDetail);
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Cars",
          "Contains various car models from different model producers , sizes and functionalities.",
          "/images/sedan.png",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Planes",
          "Contains military planes from WW1 and until modern times, different nations. All of them belong to the Military Planes collection.",
          "/images/airplane.png",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Military",
          "Contains military vehicles from the WW2 and until modern times, different nations. Most of them are from the Russian Tanks collection.",
          "/images/tank.png",
          callback
        );
      },
    ],
    cb
  );
}

function createModels(cb) {
  async.parallel([
    function (callback) {
      modelCreate(
        "Aro 240",
        "1:8",
        7500,
        "Available",
        categories[0],
        "/images/aro.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "Renault Twingo",
        "1:16",
        400,
        "Available",
        categories[0],
        "/images/twingo.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "Dacia Duster ph3",
        "1:16",
        400,
        "Available",
        categories[0],
        "/images/duster.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "Renault 8 Gordini",
        "1:16",
        450,
        "Available",
        categories[0],
        "/images/gordini.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "Renault Dauphine",
        "1:42",
        22,
        "Available",
        categories[0],
        "/images/dauphine.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "Chevrolet Stingray",
        "1:36",
        35,
        "Available",
        categories[0],
        "/images/stingray.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "Lada",
        "1:42",
        12,
        "Available",
        categories[0],
        "/images/lada.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "Saab",
        "1:36",
        35,
        "Available",
        categories[0],
        "/images/saab.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "Dacia 1300",
        "1:24",
        150,
        "Available",
        categories[0],
        "/images/dacia.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1918 Spad",
        "1:72",
        50,
        "Available",
        categories[1],
        "/images/spad.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1942 Consolidated PBY",
        "1:144",
        50,
        "Available",
        categories[1],
        "/images/catalina.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1940 MS406",
        "1:72",
        50,
        "Available",
        categories[1],
        "/images/french.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1939 PZL P-37B",
        "1:144",
        50,
        "Available",
        categories[1],
        "/images/pzl.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1917 Fokker Dr.1",
        "1:72",
        50,
        "Available",
        categories[1],
        "/images/fokker.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1942 F4F Wildcat",
        "1:72",
        50,
        "Available",
        categories[1],
        "/images/wildcat.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1954 Gloster Meteor",
        "1:100",
        50,
        "Available",
        categories[1],
        "/images/meteor.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "MiG ?",
        "1:100",
        50,
        "Available",
        categories[1],
        "/images/mig.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1944 Komet",
        "1:72",
        50,
        "Available",
        categories[1],
        "/images/komet.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1967 McDounell Douglass F-4C",
        "1:100",
        50,
        "Available",
        categories[1],
        "/images/phantom2.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1986 British Aerospace Hawk",
        "1:72",
        50,
        "Available",
        categories[1],
        "/images/hawk.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1994 A-10-A Thunderbolt II",
        "1:100",
        50,
        "Available",
        categories[1],
        "/images/thunderbolt.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "2008 Lockheed F-117A Nighthawk",
        "1:100",
        50,
        "Available",
        categories[1],
        "/images/b117.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "2008 Eurofighter Typhoon F2",
        "1:100",
        50,
        "Available",
        categories[1],
        "/images/eurofighter.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1952 Grumman F9F-2B Panther",
        "1:72",
        50,
        "Available",
        categories[1],
        "/images/panther.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1955 NorthAmerican F-100C SuperSabre",
        "1:100",
        50,
        "Available",
        categories[1],
        "/images/sabre.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "1944 Messerschmit Me262A Schwalbe",
        "1:72",
        50,
        "Available",
        categories[1],
        "/images/me262.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "Sd.Kfz.250-1942",
        "1:50",
        55,
        "Available",
        categories[2],
        "/images/sdkfz.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "T-28 ? Russian Army",
        "1:50",
        55,
        "Available",
        categories[2],
        "/images/tankT28.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "??? Russian Army",
        "1:50",
        55,
        "Available",
        categories[2],
        "/images/tankSu.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "IS-2 Russian Army",
        "1:50",
        55,
        "Available",
        categories[2],
        "/images/tankIS.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "??? Modern Russian Tank , Russian Army",
        "1:50",
        55,
        "Available",
        categories[2],
        "/images/tankM1.jpg",
        callback
      );
    },
    function (callback) {
      modelCreate(
        "??? Modern Russian Tank2 , Russian Army",
        "1:50",
        55,
        "Available",
        categories[2],
        "/images/tankM2.jpg",
        callback
      );
    },
  ]);
}

async.series(
  [createCategories, createModels],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
