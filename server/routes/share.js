const router = require("express").Router();
const Image = require("../models").image;


router.use((req, res, next) => {
  console.log("share route is processing");
  next();
});



router.get("/:imageId", async (req, res) => {
//   const allData = await Image.find();
//   res.json(allData);
    try{
        // console.log(req.params.imageId);
        let image = await Image.findById(req.params.imageId);
        // console.log(image);
        return res.send(image);

    } catch (err) {
        // console.log("fail");
        return res.status(404).send("Image doesn't not exist.");
    }
});



module.exports = router;
