
const mongoose = require("mongoose");               //mongoose 패키지 변수할당

const connect = () => {
    mongoose
    .connect("mongodb+srv://test:sparta@cluster0.zhmj7xm.mongodb.net/W3_homework?retryWrites=true&w=majority")        //mongodb연결 (주소 -> db이름)
    .catch(err => console.log(err));                //error message 출력
};

mongoose.connection.on("error", err => {
    console.error("MongoDB Connection Error", err); //error handling
});

module.exports = connect;