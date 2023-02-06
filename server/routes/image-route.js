const router = require("express").Router();
const Image = require("../models").image;
// const imageValidation = require("../validation").imageValidation;
const multer = require('multer');
const fs = require("fs")
const upload = multer({ dest: 'uploads/' })


// router.use((req, res, next) => {
//   console.log("image route is processing");
//   next();
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


router.post("/", upload.single('image'),  async (req, res) => {

  console.log( req.body, 16);

  const newImage = new Image({
    holder: req.body.holder,
    imageUrl: req.file.path
  });
  newImage.save()
  .then(() => res.send("successfully upload"))
  .catch((err) => console.log(err));

});

router.get("/", async (req, res) => {
  const allData = await Image.find();
  res.json(allData);
});

// .delete(passport.authenticate("jwt", { session: false }), recruiters.deleteJob);

router.put("/:imageId/update", async (req, res) => {
  try{
    const currentImage = await Image.findById(req.params.imageId);
    console.log(req.body.secret, 2);
    // console.log("before", currentImage);
    await currentImage.update({ secret: req.body.secret});

    return res.send("Successfully Update!!");

  } catch (err) {
    return res.status(404).send("Update fail");
  }
});

router.delete("/:imageId/delete", async (req, res) => {
  try{
    console.log(req.params.imageId);
    await Image.findByIdAndDelete(req.params.imageId);
    return res.send("Successfully delete!!!");

  } catch (err) {
    return res.status(404).send("Delete fail");
  }
});


module.exports = router;
