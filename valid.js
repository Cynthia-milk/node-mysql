module.exports={
    username(user){
        if(!user){
            return '用户名不能为空'
        }
        else if(user.length>20){
            return '用户名最长20位'
        }
        else if(!/^\w{4,20}$/.test(user)){
            return '用户名的长度为4-20位'
        }
        else{
            return null;
        }
    },
    password(password){
        if(!password){
            return '密码不能为空';
          }else if(password.length>32){
            return '密码最长32位';
          }else{
            return null;
          }
    }
}