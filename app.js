const express = require("express")
const app = express()
const port = 3000
const connect = require("./schemas")             //index.js 자동연결
const indexRouter = require("./routes/index")
connect()

app.use(express.json());                         //api보다 먼저 호출해야함 (전역 middle ware)
app.use("/", indexRouter);


app.listen(port, () => {
    console.log(port, "포트로 서버가 연결되었습니다.")
})