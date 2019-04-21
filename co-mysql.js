
const http=require('http');
const mysql=require('mysql');
const validator=require('./valid');
const url=require('url');
const coMysql=require('co-mysql'); // 本身不能连数据库,他只是数据库的一个连接器
// 设置能跨域
let allowOrigin={
    'http://localhost': true,
    'http://aaa.com': true,
    'https://aaa.com': true,
}
// 连接数据库
let conn=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '20190122',
})
let db=coMysql(conn);
http.createServer(async (req,res)=>{
    let {origin}=req.headers;
    if(allowOrigin[origin]){
        res.setHeader('access-control-allow-origin', '*');
    }
  let {pathname,query}=url.parse(req.url,true);
  if(pathname=='/reg'){
        let {username,password}=query;
        //判断用户名是否正确
        let userErr=validator.username(username);
        let passErr=validator.password(password);

        if(userErr){
            res.write(userErr);
        }else if(passErr){
            res.write(passErr);
        }
        else{
            try{
                let data=await db.query(`SELECT ID FROM user_table WHERE user_name='${username}'`);
                if(data.length>0){
                    res.write('此用户名已经被占用')
                }
                else{
                    await db.query(`INSERT INTO user_table (user_name, password) VALUES('${username}', '${password}')`);
                    res.write('注册成功');
                }
            }catch(e){
                res.write('数据库有错')
            }
        }
        res.end();
        
  }
}).listen(8012);
console.log('running.....');