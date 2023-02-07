const router = require("express").Router();
const Image = require("../models").image;


router.use((req, res, next) => {
  console.log("share route is processing");
  next();
});



router.get("/:imageId", async (req, res) => {
    try{
        let image = await Image.findById(req.params.imageId);
        return res.send(image);

    } catch (err) {
        return res.status(404).send("Image doesn't not exist.");
    }
});



module.exports = router;
