const router = require("express").Router();
const Image = require("../models").image;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//upload the image data and store it to database and imageAPI/upload file
router.post("/", upload.single('image'),  async (req, res) => {
  const newImage = new Image({
    holder: req.body.holder,
    imageUrl: req.file.path
  });
  newImage.save()
  .then(() => res.send("successfully upload"))
  .catch((err) => console.log(err));

});

// read the image data from the database
router.get("/", async (req, res) => {
  const allData = await Image.find();
  res.json(allData);
});

//update the private and public of the certain image
router.put("/:imageId/update", async (req, res) => {
  try{
    const currentImage = await Image.findById(req.params.imageId);
    await currentImage.update({ secret: req.body.secret});
    return res.send("Successfully Update!!");
  } catch (err) {
    return res.status(404).send("Update fail");
  }
});

//delete the certain image
router.delete("/:imageId/delete", async (req, res) => {
  try{
    await Image.findByIdAndDelete(req.params.imageId);
    return res.send("Successfully delete!!!");
  } catch (err) {
    return res.status(404).send("Delete fail");
  }
});


module.exports = router;
