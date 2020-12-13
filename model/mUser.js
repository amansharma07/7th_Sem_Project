const mongoose = require("mongoose");
const path = require("path");
const log = require("../utils/log");
const User = require("./User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: path.resolve(process.cwd(), "../" + ".env") });

let dbuser, dbhost, dbpassword, dbname, dbport;

if (process.env.NODE_ENV === "production") {
  dbhost = process.env.DB_PRODUCTION_HOST;
  dbport = process.env.DB_PRODUCTION_PORT;
} else {
  dbhost = process.env.DB_HOST;
  dbport = process.env.DB_PORT;
}

dbuser = process.env.DB_USER;
dbpassword = process.env.DB_PASSWORD;
dbname = process.env.DB_NAME;

const mongoURL = `mongodb://${dbuser}:${dbpassword}@${dbhost}:${dbport}/${dbname}?authSource=certification&w=1`;

//const mongoURL = `mongodb+srv://lio123:lio123@certification.gicnu.mongodb.net/certification?retryWrites=true&w=majority`;

console.log(mongoURL);

mongoose.Promise = global.Promise;

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => log.Error(err));

mongoose.connection.on("connected", (err) =>
  log.Info("MongoDB Connected for mUser.js")
);

mongoose.connection.on("error", (err) => log.Error("error: " + err));

/* mongoose
    .connect(
        
        //"mongodb+srv://collectionDbUser:collectionDbPass@cluster0.ggzb3.mongodb.net/certificationDB?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected Successfully for mUser.js");
    })
    .catch((error) => {
        console.log(error);
    }); */

const createUser = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  const v_type = req.body.v_type;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    console.log(error);
  }
  const createdUser = new User({
    _id: email,
    password: hashedPassword,
    v_type: v_type,
  });

  const existingUser = await User.findOne({ _id: req.body.email }).exec();
  if (existingUser) {
    res.send("User exists already, please login instead.");
  }

  try {
    const result = await createdUser.save();
    let token;
    try {
      token = jwt.sign(
        { email: createdUser._id, v_type: createdUser.v_type },
        "creds_secret_token_string",
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
    }
    res.json({ email: createdUser._id, v_type: createdUser.v_type, token });
  } catch (err) {
    console.log(err);
    res.json(result);
  }
};

const getUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.body.email }).exec();

  if (user) {
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(req.body.password, user.password);
    } catch (err) {
      console.log(err);
    }

    if (user._id === req.body.email && isValidPassword) {
      // res.json(user.data);
      let token;
      try {
        token = jwt.sign(
          { email: user._id, v_type: user.v_type },
          "creds_secret_token_string",
          { expiresIn: "1h" }
        );
      } catch (err) {
        console.log(err);
      }
      // res.send("Creds OK");
      res.json({ email: user._id, v_type: user.v_type, token });
    } else {
      res.send("Invalid Pssword");
    }
  } else {
    res.send("Invalid Email");
  }
};

exports.createUser = createUser;
exports.getUser = getUser;
