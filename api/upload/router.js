const express = require('express')
const router = require('express').Router()
const multer = require('multer')
const path = require('path')

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  // fileFilter: function(req, file, cb){
  //   checkFileType(file, cb);
  // }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

router.use(express.static('./public'))

router.post('/', (req, res) => {
  console.log(req.file)
  upload(req, res, (err) => {
    if(err) {
      res.status(400).json(err)
    } else {
      if (req.file == undefined) {
        res.status(400).json({ message: "no file sent" })
      } else {
        res.status(200).json({ 
          file: `uploads/${req.file.filename}`,
          message: "file uploaded!"
        })
      }
    }
  })
})

module.exports = router