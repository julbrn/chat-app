const Messages = require("../models/messageModel");
module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });
        if (data) {
            return res.json({ msg: "Message added successfully" })
        }
        return res.json({ msg: "Failed to add a message to the database" })
    }
    catch (err) {
        next(err)
    }
};
module.exports.getMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to],

            }
        }).sort({ updatedAt: 1 });
        const chatMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                time: msg.createdAt
            }
        });
        return res.json(chatMessages)
    }
    catch (err) {
        next(err)
    }
};