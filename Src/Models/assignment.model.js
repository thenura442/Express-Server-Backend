const mongoose = require("mongoose");

  const AssignmentSchema = new mongoose.Schema(
    {
        id: String,
        title: String,
        description: String,
        subject: String,
        url: {
          
        }
    },
    { 
      timestamps: true 
    }
  );

const Assignment = mongoose.model("assignment", AssignmentSchema);

module.exports.Assignment = Assignment;