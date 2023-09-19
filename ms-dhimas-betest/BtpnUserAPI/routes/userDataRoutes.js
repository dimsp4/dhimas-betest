const express = require("express");
const {
  getUserDatas,
  getUserData,
  createUserData,
  updateUserData,
  deleteUserData,
  getUserByAccountNumber,
  getUserByIdentityNumber,
} = require("../controllers/userDataController");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getCacheMiddleware,
  getByIdCacheMiddleware
} = require("../middleware/cacheMiddleware");

const router = express.Router();


router.get("/", verifyToken, getCacheMiddleware("users"), getUserDatas);

router.get("/:id", verifyToken, getByIdCacheMiddleware("users"), getUserData);

router.post("/", verifyToken, createUserData);

router.put("/:id", verifyToken, updateUserData);

router.delete("/:id", verifyToken, deleteUserData);

router.get("/byAccountNumber/:accountNumber", getUserByAccountNumber);

router.get("/byIdentityNumber/:identityNumber", getUserByIdentityNumber);

module.exports = router;
