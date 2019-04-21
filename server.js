
const mysql=require('mysql');
let db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'20190122',
    port:'8080' // 端口号
})
let username='三叶酱',password='20190218';
// 对数据库进行增删改查
db.query(`INSERT INTO user_table (user_name, password,online) VALUES('${username}', '${password}',0)`,(err,data)=>{
    if(err) {
        console.log(err)
    }
    else{
        console.log(data)
    }
})
// // 关闭连接
// db.end(err=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('关闭成功')
// });