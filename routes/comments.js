const express = require("express")
const Comments = require("../schemas/comment")
const router = express.Router()


// 댓글 생성☆
router.post("/", async (req, res) => {
        const { username, password, content } = req.body    
        try {
            await Posts.create({ username, password, content })
            return res.status(200).json({
            Success : true,
            Message : "댓글을 생성하였습니다."
        }) 
        } catch (error) {
            return res.status(400).json({
                Success : false,
                Message : "데이터 형식이 올바르지 않습니다."
            })
        }        
})

// 댓글 조회☆
router.get("/", async (req, res) => { 
    const data = await Comments.find({}, { username: true, content: true, createAt: true }).sort("createdAt" -1)
    res.json({ data : data})
})

// 댓글 상세조회☆
router.get("/:postId", async (req, res) => {

    const { postId } = req.params

    try {
        if (!(postId.length)){
            return res.status(400).json({
                Success : false,
                Message : "데이터 형식이 올바르지 않습니다."
            })
        }
        else {
            const data = await Comments.find({ _id : postId}, { _id: false, username: true, content: true, createAt: true }).sort("createdAt" -1)
            res.json({ data : data})
        }       
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            Success : false,
            Message : "500 Server Error"
        })
    }
})

// 댓글 수정☆
router.put("/:postId", async (req, res) => {

    const { postId } = req.params
    const { password, content } = req.body

    const idChecked = await Comments.find ({ _id: postId })

    try {
        if (!idChecked.length){
            return res.status(400).json({
                Succese : false,
                Message : "댓글 조회에 실패하였습니다."
            })
        } else if ( !content ){
            return res.status(404).json({
                Succese : false,
                Message : "댓글 내용을 입력해주세요."
            })
        } else {
            await Comments.updateOne(
                    { password : password },
                    { $set: { content : content } 
                }
            )
            return res.status(200).json({
                Succese : true,
                Message : "댓글을 수정하였습니다."
            })
        } 
    } catch (error) {
        return res.status(404).json({
            Success : false,
            Message : "데이터 형식이 올바르지 않습니다."
        })
    }
})

// 댓글 삭제☆
router.delete("/:postId", async (req, res) => {

    try {
        const { postId } = req.params
        const { password } = req.body
        const idChecked = await Comments.findOne({ _id : postId })
       
        if (!idChecked){
            return res.status(404).json({
                Success : false,
                Message : "댓글 조회에 실패하였습니다."
            })        
        
        } else if ((idChecked.password === password)){
            await Comments.deleteOne({ _id : postId })
            return res.status(200).json({
                Success : true,
                Message : "댓글을 삭제하였습니다."
            })
        } 
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            Success : false,
            Message : "500 Server Error"
        })
    }
})


module.exports = router