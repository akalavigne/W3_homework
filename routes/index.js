const express = require("express")
const postsRouter = require("./posts")
const commentsRouter = require("./comments")
const router = express.Router()

router.use("/post", postsRouter)
router.use("/comment", commentsRouter)

router.get("/", (req, res) => {
    res.send("Hello World");
})

module.exports = router