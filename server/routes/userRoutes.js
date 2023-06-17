const { register, login, setAvatar, getAllContacts } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", setAvatar);
router.get("/contacts/:id", getAllContacts);

module.exports = router;