





##### 

#### 使用的是mysql数据库

这边没有使用任何框架,使用的是node原生来连接数据库

#### 类型

整数

- tinyint（128~127或0~255）
- int（21亿~43亿）

浮点数

- float（8位）
- double（308位）

字符串

- varchar--小字符串（255）
- text --大字符串2G

主键作用：唯一值，性能高

###### wamp中我们新建的数据库存储在哪里

*右键打开文件路径，然后找到bin-->mysql->()data->mydatabase



SQL语法：

- 增

  ```
  INSERT INTO 表 (字段列表) VALUES(值)
  INSERT INTO user_table (user_name,password,online) VALUES ('Jack','111111',0)
  
  ```

- 删

  ```
  DELETE FROM user_table WHERE user_name='Jack'
  ```

- 改

  ```
  UPDATE 表 SET 字段=新值 WHERE 条件
  UPDATE user_table SET ID='5' WHERE user_name='Jack'
  ```

- 查

  ```
  SELECT 字段列表 FROM WHERE 条件
  SELECT user_name,online FROM user_table WHERE ID=1
  ```

安装了wamp之后,就已经带了mysql,操作数据库可以打开这个网址`http://localhost/phpmyadmin/`

##### node结合mysql数据库

确保电脑上有安装mysql,在数据库中建好相对应的数据库

在项目中安装mysql模块

```
npm i mysql -D 
```

使用数据库

```javascript
const mysql=require('mysql'); // 引入模块
// 连接数据库  mysql.createConnection只能建立一个
// createPool建立连接池,可以有多个连接
let db=mysql.createPool({
    connectionLimit:10, //  设置最大的(用户)连接数,不能太多不然会加大数据库的压力
    host:'localhost', // 数据库的主机名
    user:'root', // mysql用户名
    password:'', // mysql用户密码
    database:'20190122' // 用于此连接的数据库名称
})
// 
db.query(`INSERT INTO user_table (user_name, password,online) VALUES('${username}', '${password}',0)`,(err,data)=>{
    if(err) {
        console.log(err)
    }
    else{
        console.log(data)
    }
})
```



