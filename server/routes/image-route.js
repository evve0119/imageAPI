const router = require("express").Router();
const Image = require("../models").image;
const imageValidation = require("../validation").imageValidation;

router.use((req, res, next) => {
  console.log("image route正在接受一個request...");
  next();
});

// 獲得系統中的所有課程
router.get("/", async (req, res) => {
  try {
    let imageFound = await Image.find({})
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(imageFound);
  } catch (e) {
    return res.status(5000).send(e);
  }
});

// // 用講師id來尋找課程
// router.get("/instructor/:_instructor_id", async (req, res) => {
//   let { _instructor_id } = req.params;
//   let imagesFound = await Image.find({ instructor: _instructor_id })
//     .populate("instructor", ["username", "email"])
//     .exec();
//   return res.send(imagesFound);
// });

// // 用學生id來尋找註冊過的課程
// router.get("/student/:_student_id", async (req, res) => {
//   let { _student_id } = req.params;
//   let imagesFound = await Image.find({ students: _student_id })
//     .populate("instructor", ["username", "email"])
//     .exec();
//   return res.send(imagesFound);
// });

// // 用課程名稱尋找課程
// router.get("/findByName/:name", async (req, res) => {
//   let { name } = req.params;
//   try {
//     let imageFound = await Image.find({ title: name })
//       .populate("instructor", ["email", "username"])
//       .exec();
//     return res.send(imageFound);
//   } catch (e) {
//     return res.status(500).send(e);
//   }
// });

// // 用課程id尋找課程
// router.get("/:_id", async (req, res) => {
//   let { _id } = req.params;
//   try {
//     let imageFound = await Image.findOne({ _id })
//       .populate("instructor", ["email"])
//       .exec();
//     return res.send(imageFound);
//   } catch (e) {
//     return res.status(500).send(e);
//   }
// });

// 新增課程
// router.post("/", async (req, res) => {
//   // 驗證數據符合規範
//   let { error } = imageValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   if (req.user.isStudent()) {
//     return res
//       .status(400)
//       .send("只有講師才能發佈新課程。若你已經是講師，請透過講師帳號登入。");
//   }

//   let { title, description, price } = req.body;
//   try {
//     let newImage = new Image({
//       title,
//       description,
//       price,
//       instructor: req.user._id,
//     });
//     let savedImage = await newImage.save();
//     return res.send("新課程已經保存");
//   } catch (e) {
//     return res.status(500).send("無法創建課程。。。");
//   }
// });

// 讓學生透過課程id來註冊新課程
// router.post("/enroll/:_id", async (req, res) => {
//   let { _id } = req.params;
//   try {
//     let image = await Image.findOne({ _id }).exec();
//     image.students.push(req.user._id);
//     await image.save();
//     return res.send("註冊完成");
//   } catch (e) {
//     return res.send(e);
//   }
// });

// 更改課程
// router.patch("/:_id", async (req, res) => {
//   // 驗證數據符合規範
//   let { error } = imageValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let { _id } = req.params;
//   // 確認課程存在
//   try {
//     let imageFound = await Image.findOne({ _id });
//     if (!imageFound) {
//       return res.status(400).send("找不到課程。無法更新課程內容。");
//     }

//     // 使用者必須是此課程講師，才能編輯課程
//     if (imageFound.instructor.equals(req.user._id)) {
//       let updatedImage = await Image.findOneAndUpdate({ _id }, req.body, {
//         new: true,
//         runValidators: true,
//       });
//       return res.send({
//         message: "課程已經被更新成功",
//         updatedImage,
//       });
//     } else {
//       return res.status(403).send("只有此課程的講師才能編輯課程。");
//     }
//   } catch (e) {
//     return res.status(500).send(e);
//   }
// });

// router.delete("/:_id", async (req, res) => {
//   let { _id } = req.params;
//   // 確認課程存在
//   try {
//     let imageFound = await Image.findOne({ _id }).exec();
//     if (!imageFound) {
//       return res.status(400).send("找不到課程。無法刪除課程。");
//     }

//     // 使用者必須是此課程講師，才能刪除課程
//     if (imageFound.instructor.equals(req.user._id)) {
//       await Image.deleteOne({ _id }).exec();
//       return res.send("課程已被刪除。");
//     } else {
//       return res.status(403).send("只有此課程的講師才能刪除課程。");
//     }
//   } catch (e) {
//     return res.status(500).send(e);
//   }
// });

module.exports = router;
