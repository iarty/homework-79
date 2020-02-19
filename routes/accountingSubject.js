const { Router } = require("express");
const router = Router();
const fs = require("fs");
const mysqlDb = require("../db");

const { upload } = require("../multer");

router.get("/items", async (req, res) => {
  try {
    const items = await mysqlDb
      .connection()
      .query("SELECT * FROM `accounting_subject`");
    if (!items[0]) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).json({ items: items[0] });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const item = await mysqlDb
      .connection()
      .query("SELECT * FROM `accounting_subject` WHERE id = ?", req.params.id);
    if (!item[0]) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).json({ item: item[0] });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.post("/items", upload.single("image"), async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `uploads/${req.file.filename}`;
    }
    const items = await mysqlDb
      .connection()
      .query(
        "INSERT INTO `accounting_subject` (`category_id`,`location_id`,`name`,`description`,`image`) VALUES" +
          "(?,?,?,?,?)",
        [
          req.body.category_id,
          req.body.location_id,
          req.body.name,
          req.body.description,
          req.body.image
        ]
      );

    return res.status(201).json({ items });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.delete("/items/:id", async (req, res) => {
  try {
    await mysqlDb
      .connection()
      .query("DELETE FROM `accounting_subject` WHERE id = ?", req.params.id);
    return res.status(200).json({ message: "deleted successful" });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.put("/items/:id", upload.single("image"), async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `uploads/${req.file.filename}`;
    }
    // console.log(req.body);
    await mysqlDb
      .connection()
      .query(
        "UPDATE `accounting_subject` SET category_id =?, location_id =?, name =? , description =?, image =?  WHERE id =?",
        [
          req.body.category_id,
          req.body.location_id,
          req.body.name,
          req.body.description,
          req.body.image,
          req.params.id
        ]
      );
    res.status(200).json({ message: "updated successful" });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
