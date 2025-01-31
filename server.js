require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const log = require("./utils/log");
const path = require("path");
// const mongoose = require("mongoose");
const User = require("./model/mUser");
const checkAuth = require("./middleware/check-auth");

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = "development";
const Certificates = require("./model/Certificates");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// logger
app.use((req, res, next) => {
  const now = new Date().toString().slice(4, 24);
  res.on("finish", () => {
    log.Logger(`${now} ${req.method} ${res.statusCode} ${req.url}`);
  });
  next();
});

// CORS
if (process.env.NODE_ENV !== "production") app.use(require("cors")());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.post("/signup", User.createUser);

app.post("/login", User.getUser);

//app.use(checkAuth);

app.get("/certificate/data/:id", (req, res) => {
  let certificateId = req.params.id;
  Certificates.findById(certificateId)
    .then((obj) => {
      if (obj === null)
        res.status(400).send({ err: "Certificate data doesn't exist" });
      else res.send(obj);
    })
    .catch((err) => res.status(400).send({ err }));
});

app.get("/certificate/verify/:id", (req, res) => {
  let certificateId = req.params.id;

  Certificates.findById(certificateId)
    .then((obj) => {
      obj.verifyData().then((verified) => {
        if (verified) res.status(200).send();
        else res.status(401).send();
      });
    })
    .catch((err) =>
      res.status(400).send({ err: "No data found for the given certificateId" })
    );
});

app.get("/certificate/all", (req, res) => {
  Certificates.find()
    .then((obj) => {
      if (obj === null)
        res.status(400).send({ err: "Certificates data doesn't exist" });
      else {
        res.send(obj);
        console.log("OBJ get all", obj);
      }
    })
    .catch((err) => res.status(400).send({ err }));
});

// MongoClient.connect(dbConfig.url, function(err, db) {
//     useNewUrlParser: true
//     if (err) throw err;
//     var dbo = db.db("avengers");
//     dbo.collection("weapons").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         res.send(result);
//         db.close();
//     });
// });

app.post("/certificate/generate", (req, res) => {
  const { candidateName, orgName, courseName, assignDate, duration, cpi } = req.body;

  const given = new Date(assignDate);

  let expirationDate = given.setFullYear(given.getFullYear() + duration);

  expirationDate = expirationDate.toString();

  const certificate = new Certificates({
    candidateName,
    orgName,
    courseName,
    expirationDate,
    assignDate,
    duration,
    cpi,
  });

  certificate
    .save()
    .then((obj) => {
      const dbRes = obj.toJSON();
      obj
        .appendBlockchain()
        .then((data) => {
          console.log(dbRes);
          const { transactionHash, blockHash } = data.receipt;
          res.status(201).send({
            receipt: {
              transactionHash,
              blockHash,
            },
            data: dbRes,
          });
        })
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => {
      log.Error(err);
      res.status(400).send();
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  log.Info(
    `This is a ${process.env.NODE_ENV} environment.\nServer is up on port ${port}`
  );
});

module.exports = { app };
