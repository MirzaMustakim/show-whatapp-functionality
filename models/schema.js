const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
from : {
   type : String,
   required : true,
  },

msg : {
    type : String,
},

to : {
     type : String,
     require : true,
},
  date : {
    type : Date,
    required : true,
}
}); 

const Model = mongoose.model('Model' , chatSchema);    // here i define my model
module.exports = Model;