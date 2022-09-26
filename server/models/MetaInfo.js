const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const metainfoSchema = new Schema({
    id: {
    type: Schema.Types.ObjectId,
    ref: "contents",
  },

  ProcedureName: {
    type: String,
  },

  labtype: {
    type: String,
  },
  
  department: {
    type: String,
  },

  semester: {
    type: String,
  },

  year: {
    type: String,
  },

  institute: {
    type: String,
  },
  university: {
    type: String,
  },
  
  status: {
    type: Boolean,
    default: false,
  },
  category :{
    type:String
  }
});

module.exports = MetaInfo = mongoose.model("metainfo", metainfoSchema);
