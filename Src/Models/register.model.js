const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    email: String,
    type: String
  },
  { 
    timestamps: true 
  }
);

const AdminSchema = new mongoose.Schema(
    {
      _id: String,
      name: String,
      email: String,
      type: String
    },
    { 
      timestamps: true 
    }
  );

  const StaffSchema = new mongoose.Schema(
    {
      _id: String,
      name: String,
      email: String,
      type: String
    },
    { 
      timestamps: true 
    }
  );

  const LecturerSchema = new mongoose.Schema(
    {
      _id: String,
      name: String,
      email: String,
      type: String
    },
    { 
      timestamps: true 
    }
  );

const Student = mongoose.model("student", StudentSchema);
const Admin = mongoose.model("admin", AdminSchema);
const Staff = mongoose.model("staff", StaffSchema);
const Lecturer = mongoose.model("lecturer", LecturerSchema);

module.exports.Student = Student;
module.exports.Admin = Admin;
module.exports.Staff = Staff;
module.exports.Lecturer = Lecturer;