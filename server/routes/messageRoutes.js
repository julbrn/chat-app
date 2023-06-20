const { addMessage, getMessage } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addmessage", addMessage);
router.post("/getmessage", getMessage);

module.exports = router;