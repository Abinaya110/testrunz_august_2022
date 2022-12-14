const mongoose = require("mongoose");
const crypto = require("crypto");

require("dotenv").config();

const secret = process.env.secret || "abcdefg";
// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      max: 32,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowercase: true,
    },
    salt: {
      type: String,
    },
    instituteName: {
      type: String,
    },
    department: {
      type: String,
    },
    country: {
      type: String,
    },
    university: {
      type: String,
    },
    state: {
      type: String,
    },
    year: {
      type: Number,
    },
    semester: {
      type: Number,
    },
    showOnce:{
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "student",
    },
    labtype: {
      type: [String],
    },
    reset_passLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

// virtual
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPasswrd(password);
  })
  .get(function () {
    return this._password;
  });
// methods
userSchema.methods = {
  authenticate(plainText) {
    return this.encryptPasswrd(plainText) === this.hashed_password;
  },
  encryptPasswrd(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "error";
    }
  },
  makeSalt() {
    return `${secret}${Math.round(new Date().valueOf() * Math.random())}`;
  },
};

module.exports = mongoose.model("User", userSchema);
