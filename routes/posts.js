const express = require("express")
const Posts = require("../schemas/post")
const router = express.Router()


// 게시글 생성☆
router.post("/", async (req, res) => {
        const { username, password, title, content } = req.body         
        try {                                                           
            await Posts.create({ username, password, title, content }) 
            return res.status(200).json({
            Success : true,
            Message : "게시물을 생성하였습니다."
        }) 
        } catch (error) {
            return res.status(400).json({                               
                Success : false,
                Message : "데이터 형식이 올바르지 않습니다."
            })
        }        
})

// 게시글 조회☆ 
router.get("/", async (req, res) => { 
    const data = await Posts.find({}, { username: true, title: true, content: true, createAt: true }).sort("createdAt" -1)
    res.json({ data : data})
})

// 게시글 상세조회☆
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
            const data = await Posts.find({ _id : postId}, { _id: false, username: true, title: true, content: true, createAt: true }).sort("createdAt" -1)
            res.json({ data : data})
        }       
    } catch (error) {
        return res.status(500).json({
            Success : false,
            Message : "500 Server Error"
        })
    }
})

// 게시글 수정☆
router.put("/:postId", async (req, res) => {

    const { postId } = req.params
    const { password, title, content } = req.body
    const idChecked = await Posts.findById( postId )
    // console.log(idChecked)
    try {
        if (!idChecked.length){
            return res.status(400).json({
                Succese : false,
                Message : "게시글 조회에 실패하였습니다."
            })
        } else {
            await Posts.updateOne(
                    { password : password },
                    { $set: { title : title, content : content} 
                }
            )
            return res.status(200).json({
                Succese : true,
                Message : "게시글을 수정하였습니다."
            })
        }
    } catch (error) {
        return res.status(404).json({
            Success : false,
            Message : "데이터 형식이 올바르지 않습니다."
        })
    }
})

// 게시글 삭제☆
router.delete("/:postId", async (req, res) => {

    try {
        const { postId } = req.params
        const { password } = req.body
        const idChecked = await Posts.findOne({ _id : postId })
       
        if (!idChecked){
            return res.status(404).json({
                Success : false,
                Message : "게시글 조회에 실패하였습니다."
            })        
        
        } else if ((idChecked.password === password)){
            await Posts.deleteOne({ _id : postId })
            return res.status(200).json({
                Success : true,
                Message : "게시글을 삭제하였습니다."
            })
        } 
    } catch (error) {
        return res.status(500).json({
            Success : false,
            Message : "500 Server Error"
        })
    }
})


module.exports = router