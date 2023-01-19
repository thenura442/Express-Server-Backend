const mongoose = require("mongoose");

  const SubjectSchema = new mongoose.Schema(
    {
      _id: String,
      name: String,
      description: String,
      lecturer: String,
      grade: String,
      url: String
    },
    { 
      timestamps: true 
    }
  );

const Subject = mongoose.model("subject", SubjectSchema);

module.exports.Subject = Subject;