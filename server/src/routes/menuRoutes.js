const express = require("express");

const router = express.Router();

const {
  getMenuItems,
  addMenuItem,
} = require("../controllers/menuController");


// GET MENU
router.get("/", getMenuItems);


// ADD MENU ITEM
router.post("/", addMenuItem);


module.exports = router;