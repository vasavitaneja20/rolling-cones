const MenuItem = require("../models/MenuItem");


// GET ALL MENU ITEMS
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADD MENU ITEM
const addMenuItem = async (req, res) => {
  try {
     console.log(req.body);
    const {
      name,
      category,
      description,
      price,
      imageUrl,
      available
    } = req.body;

    const newItem = new MenuItem({
      name,
      category,
      description,
      price,
      imageUrl,
      available
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
};