const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const userSchema = new Schema({
  runID: {
    type: String,
    // unique: true,
    index: true,
    sparse: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  procedureDescription: {
    type: String,
    required: true,
  },
  labType: {
    type: String,
    required: true,
  },
  experimentName: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    default: new Date().getTime(),
  },
  userid:{
    type: Schema.Types.ObjectId
    
  },
//   datas : {
//     type: Map,
//     of: String
// },
datas: {
  type: String,
},
shareWith:{
  type:[String],
  
},
sharedDate:{
type:Number,
},
status:{
  type:String,
  required: true,
  default: "Created",

},
assignedBy: {
  type: String,
 
},
expresult: {
  type: String,
 
},
instituteName:{
  type:String,
  required: true,
},
university:{
  type:String,
  required: true,
},
department:{
  type:String,
  required: true,
},
grade: {
  type: String,

},
remark:{
  type: String,
  
},
});

module.exports = User = mongoose.model("experiments", userSchema);
