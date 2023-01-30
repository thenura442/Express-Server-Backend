const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './Public/Files');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      if(file.mimetype === 'application/msword'){
        filetype = 'doc';
      }
      if(file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        filetype = 'docx';
      }

      if(filetype === 'application/vnd.ms-powerpoint'){
        filetype = 'ppt';
      }
      if(filetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
        filetype = 'pptx';
      }

      if(file.mimetype === 'application/pdf') {
        filetype = 'pdf';
      }

      if(file.mimetype === 'application/vnd.ms-excel') {
        filetype = 'xls';
      }

      if(file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        filetype = 'xlsx';
      }

      if(file.mimetype === 'text/plain'){
        filetype = 'txt';
      }

      if(file.mimetype === 'application/zip'){
        filetype = 'zip';
      }

      if(file.mimetype === 'application/x-7z-compressed'){
        filetype = '7z';
      }

      if (file.mimetype === 'application/vnd.rar'){
        filetype = 'rar';
      }

      if(file.mimetype === 'application/gzip'){
        filetype = 'gz';
      }
      Name = file.originalname.split('.');
      file_name = Name[0].replace(/ /g,"-");
      cb(null, file_name+'--' + Date.now() + '.' + filetype);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 150 * 1024 * 1024 }, // 150 MB
    }).single('url')
    
const uploadMany = multer({
    storage: storage,
    limits: { fileSize: 150 * 1024 * 1024 }, // 150 MB
    }).array('url', 5)



module.exports.upload = upload;
module.exports.uploadMany = uploadMany;