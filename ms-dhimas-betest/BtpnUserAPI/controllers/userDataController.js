const UserData = require("../models/userData");
const asyncHandler = require("express-async-handler");
const { client } = require("../middleware/cacheMiddleware");

const getUserDatas = asyncHandler(async (req, res) => {
  console.log("GET DATA");
  try {
    const userDatas = await UserData.find({});

    await client.setEx("users", 3600, JSON.stringify(userDatas));

    return res.status(200).json(userDatas);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

const getUserData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await UserData.findById(id);

    if (userData) {
      res.status(200).json(userData);
    } else {
      return res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getUserByAccountNumber = asyncHandler(async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const userData = await UserData.findOne({ accountNumber });
    if (!userData) {
      return res
        .status(404)
        .json({ message: `Cannot find accountNumber ${accountNumber}` });
    }
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const getUserByIdentityNumber = asyncHandler(async (req, res) => {
  try {
    const { identityNumber } = req.params;
    const userData = await UserData.findOne({ identityNumber });
    if (!userData) {
      return res
        .status(404)
        .json({ message: `Cannot find identityNumber ${identityNumber}` });
    }
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const createUserData = asyncHandler(async (req, res) => {
  try {
    const userData = await UserData.create(req.body);
    client.del("users")
    res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const updateUserData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await UserData.findByIdAndUpdate(id, req.body);
    if (!userData) {
      res.status(404);
      throw new Error(`Cannot find any UserData with ID ${id}`);
    }
    const updatedUserData = await UserData.findById(id);
    client.del("users")
    res.status(200).json(updatedUserData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const deleteUserData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await UserData.findByIdAndDelete(id);
    if (!userData) {
      return res.status(404).json({message: `Cannot find any UserData with ID ${id}`});
    }
    client.del("users")
    return res.status(200).json({message: "Delete Success"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getUserDatas,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  getUserData,
  createUserData,
  updateUserData,
  deleteUserData,
};
