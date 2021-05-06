const express = require('express')
const db = require('../data/db-config')
const router = express.Router()
const fileUpload = require('express-fileupload')
const {checkRecipeExists} = require('../recipes/middlewares')
const restricted = require('../auth/restricted')

router.use(fileUpload());

// Upload Endpoint
router.post('/', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/../../public/images/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/images/${file.name}` });
  });
});

router.post('/recipe_images/:id', checkRecipeExists, restricted('recipe_user'), (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const { id } = req.recipe
  const file = req.files.file;
  // reject non images
  const re = /jpg|jpeg|gif|png/i
  if(!re.test(file.name)){
    return res.status(400).json({ message: "Image files only!" })
  }

  if(file.size > 1000000){
    return res.status(400).json({ message: "File Size Limit: 1 MB"})
  }
  const filename = id + '.' + file.name.split('.').pop()
  file.mv(`${__dirname}/../../public/images/recipes/${filename}`, async err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    
    //add filename/url to db
    const recipe = await db('recipes').where({ id }).update({ image_url: `/images/recipes/${filename}` })
    console.log(recipe)
    res.json({ fileName: filename, filePath: `/images/recipes/${filename}` });
  });
});

module.exports = router