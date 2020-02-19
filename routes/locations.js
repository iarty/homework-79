const mysqlDb = require("../db");
const { Router } = require("express");
const router = Router();

router.get("/locations", async (req, res) => {
  try {
    const locations = await mysqlDb
      .connection()
      .query("SELECT * FROM `location`");
    if (!locations[0]) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).json({ locations: locations[0] });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/locations/:id", async (req, res) => {
  try {
    const location = await mysqlDb
      .connection()
      .query("SELECT * FROM `location` WHERE id = ?", req.params.id);
    if (!location[0]) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).json({ location: location[0] });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.post("/locations", async (req, res) => {
  try {
    const locations = await mysqlDb
      .connection()
      .query("INSERT INTO `location` (`name`,`description`) VALUES" + "(?,?)", [
        req.body.name,
        req.body.description
      ]);
    return res.status(200).json({ locations: locations[0] });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.delete("/locations/:id", async (req, res) => {
  try {
    await mysqlDb
      .connection()
      .query("DELETE FROM `location` WHERE id = ?", req.params.id);
    res.status(200).json({ message: "deleted successful" });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.put("/locations/:id", async (req, res) => {
  try {
    await mysqlDb
      .connection()
      .query("UPDATE `location` SET name =? , description =?  WHERE id =?", [
        req.body.name,
        req.body.description,
        req.params.id
      ]);
    res.status(200).json({ message: "updated successful" });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
