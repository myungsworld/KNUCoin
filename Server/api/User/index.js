const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const dbConObj = require('../../config/db_info'); //디비 정보 import
const dbconn = dbConObj.init(); //sql 실행결과( results(배열 + json 형태)에 저장)
const moment = require('moment'); 

module.exports = router;

router.post('/check', (req, res) => {
    console.log('<<Signup/check>>');
    
    req.on('data', (data) => {
        inputData = JSON.parse(data);
        var find_id = inputData.user_id;

        var sql = 'SELECT * FROM user WHERE user_id = ?'; 
        dbconn.query(sql,[find_id],function (err, rows, fields) {
            if(!err){
                if(rows.length==0){
                    console.log('no duplication');
                    res.status(200).json({"result" : "no duplication"});
                }
                else if (rows.length == 1 && rows[0].user_id == find_id) {
                    console.log('duplication');
                    res.status(404).json({ "result": "duplication" });
                    check = true;
                }
                else {
                    console.log('*******DB 사용자 중복********');
                    res.status(404).json({"result" : "Error"});
                }
            }else{
                res.status(404).json({"result" : err});
                console.log(err);
            }
        });
    });
});

router.post('/signup', (req, res) => {
    console.log('<<Signup/signup>>');
    req.on('data', (data) => {
        var input_data_array= [];
        var inputData = JSON.parse(data); // JSON data 받음

        require('moment-timezone'); //현재 날짜 시간 받기
        moment.tz.setDefault("Asia/Seoul");
        var date = moment().format('YYYY-MM-DD HH:mm:ss'); 

        input_data_array.push(inputData.user_id);//JSON values -> array
        input_data_array.push(inputData.category);
        input_data_array.push(inputData.name);
        input_data_array.push(inputData.phone);
        input_data_array.push(date);

        crypto.randomBytes(64, (err, buf) => {
            crypto.pbkdf2(inputData.pwd,  buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
            //crypto.pbkdf2(inputData.pw, buf.toString('base64'), 9000, 64, 'sha512', (err, key) => {
                input_data_array.push(key.toString('base64')); //pwd
                input_data_array.push(buf.toString('base64')); //salt
                console.log("key = " +key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
                console.log("buf = " +buf.toString('base64'));
                console.log('input_data : ' + input_data_array); // 회원가입 내용 출력
                
                var sql_insert = 'INSERT INTO knucoin.user (user_id ,category, name,  phone, signup_time, pwd, salt) VALUES(?, ?, ?, ?, ?, ?, ?)';
                dbconn.query(sql_insert,input_data_array, function (err, rows, fields) {//DB connect
                    if (!err) {
                        console.log('Query insert success');
                        res.status(200).json({"result" : "Success"});
                    } else {
                        console.log('Query Error : ' + err);
                        res.status(404).json({"result" : err});
                    }
                });
            });
        });
        
    });
});

router.post('/login', (req, res) => {
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