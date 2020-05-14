const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const dbConObj = require('../config/db_info');	//디비 정보 import
const dbconn = dbConObj.init(); //sql 실행결과( results(배열 + json 형태)에 저장)
 

router.post('/', function (req, res) {
    console.log('<<Login>>');

    req.on('data', (data) => {
        inputData = JSON.parse(data);
        var login_id = inputData.user_id;
        var login_pwd = inputData.pwd;

        var sql = 'SELECT * FROM user WHERE user_id = ?'; 
        dbconn.query(sql,[login_id],function (err, rows, fields) {
            if(!err){
                if(rows.length==0){
                    console.log('회원가입 되지않은 사용자 접속 : ' + login_id);
                    res.json({"result" : "No find"});
                }
                else if(rows.length==1){
                    crypto.randomBytes(64, (err, buf) => {  //암호화 후 회원가입 정보 입력
                        if(err)
                            console.log('crypto error : '+ err);
                        else {
                            crypto.pbkdf2(login_pwd, rows[0].salt, 100000, 64, 'sha512', (err, key) => {
                                if (err) 
                                    console.log('crypto2 error : '+err);
                                else {
                                    if(key.toString('base64')===rows[0].pwd){
                                        res.json({'result': 'Success'});
                                        console.log('로그인 성공! ' + login_id + '님 환영합니다!');
                                    }
                                    else {
                                        res.json({ 'result': 'Wrong Password' });
                                        console.log('사용자'+login_id+'가 비밀번호가 틀렸습니다!');
                                    }
                                }
                            });
                        }
                    });
                }
                else{
                    console.log('*******DB 사용자 중복********');
                    res.json({"result" : "Error"});
                }
            }
            else{
                console.log('Login Query error : '+ err);
                res.json({"result" : err});
            }
        });
    });

    
    
});

module.exports = router;