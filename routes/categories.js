const { Router } = require("express");
const router = Router();
const mysqlDb = require("../db");

router.get("/categories", async (req, res) => {
  try {
    const categories = await mysqlDb
      .connection()
      .query("SELECT `id`,`name` FROM `categories`");
    if (!categories[0]) {
      return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).json({ categories: categories[0] });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const category = await mysqlDb
      .connection()
      .query("SELECT * FROM `categories` WHERE id = ?", req.params.id);
    if (!category[0]) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).json({ category: category[0] });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.post("/categories", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.name) {
      return res.status(500).json({ error: "Empty name" });
    }
    const response = await mysqlDb
      .connection()
      .query(
        "INSERT INTO `categories` (`name`,`description`) VALUES" + "(?,?)",
        [req.body.name, req.body.description]
      );
    const category = await mysqlDb
      .connection()
      .query("SELECT * FROM `categories` WHERE id =?", response[0].insertId);
    const [TextRows] = category[0];
    return res.status(200).json({ category: TextRows });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    await mysqlDb
      .connection()
      .query("DELETE FROM `categories` WHERE id = ?", req.params.id);
    res.status(200).json({ message: "deleted successful" });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.put("/categories/:id", async (req, res) => {
  try {
    await mysqlDb
      .connection()
      .query("UPDATE `categories` SET name =? , description =?  WHERE id =?", [
        req.body.name,
        req.body.description,
        req.params.id
      ]);
    const category = await mysqlDb
      .connection()
      .query("SELECT * FROM `categories` WHERE id =?", req.params.id);
    res.status(200).json({ category: category[0] });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
