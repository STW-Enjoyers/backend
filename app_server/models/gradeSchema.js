const Mongoose = require("mongoose")

const gradeSchema = new Mongoose.Schema({
    nota: { type: Number},
    centro: { type: String },
    estudio: { type: String },
    localidad : { type: String },
    cupo : { type: String },
    curso : { type: Number},
    lastOne : {
       type: Boolean,
       default: true
    }
  })
  module.exports = Mongoose.model("Grade", gradeSchema)

