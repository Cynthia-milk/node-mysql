const http=require('http');
const mysql=require('mysql');
const fs=require('fs');
const url=require('url');
// 连接服务器

let db=mysql.createPool({
    connectionLimit:10, //  设置最大的(用户)连接数,不能太多不然会加大数据库的压力
    host: 'localhost',
    user: 'root',
    password: '',
    database: '20190122',
});

// 和http配合
http.createServer((req,res)=>{
    const {pathname,query}=url.parse(req.url,true);
   
    if(pathname=='/reg'){
        // 判断参数是否正确
        let {username,password}=query;
        if(!username||!password){
            res.writeHead(400, {"Content-Type":"text/plain;charset=utf-8"})
            res.write('用户名和密码不能为空');
            res.end();
        }
        else if(username.length>32){
            res.writeHead(400, {"Content-Type":"text/plain;charset=utf-8"});
            res.write('用户名长度不能超过32个字符');
            res.end();
        }
        else if(password.length>16){
            res.write('密码长度不能大于16');
            res.end();
        }
        else{
            // 检查数据库中是否存在该用户名,没有的话就插入
            db.query(`SELECT ID FROM user_table WHERE user_name='${username}'`,(err,data)=>{
                if(err){
                    res.writeHead(500, {"Content-Type":"text/plain;charset=utf-8"});
                    res.write('数据库有错');
                    res.end();
                }
                else if(data.length>0){
                    res.writeHead(400, {"Content-Type":"text/plain;charset=utf-8"});
                    res.write('此用户名已被占用');
                    res.end();
                }
                else{
                    db.query(`INSERT INTO user_table (user_name,password) VALUES('${username}','${password}',0)`,(err,data)=>{
                        if(err){
                            res.writeHead(400, {"Content-Type":"text/plain;charset=utf-8"});
                            res.write('数据库有错');
                            res.end();
                        }
                        else{
                            res.writeHead(400, {"Content-Type":"text/plain;charset=utf-8"});
                            res.write('注册成功');
                            res.end();
                        }
                    })
                }
            })
        }

    }
    else if(pathname=='/login'){
    }
    else{
        res.write('not found');
        res.end();
    }
    
}).listen(8088);
console.log('running....');