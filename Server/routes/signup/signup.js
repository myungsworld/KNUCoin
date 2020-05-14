const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const dbConObj = require('../../config/db_info');	//디비 정보 import
const dbconn = dbConObj.init(); //sql 실행결과( results(배열 + json 형태)에 저장)
const moment = require('moment'); 

router.post('/signup', function (req, res) {
    
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
                        res.json({"result" : "Success"});
                    } else {
                        console.log('Query Error : ' + err);
                        res.json({"result" : err});
                    }
                });
            });
        });
        
    });

    
    
});

router.post('/check', function (req, res, next) {
    console.log('<<Signup/check>>');
    
    req.on('data', (data) => {
        inputData = JSON.parse(data);
        var find_id = inputData.user_id;

        var sql = 'SELECT * FROM user'; 
        dbconn.query(sql,function (err, rows, fields) {
            if(!err){
                var check = false;
                for(var i =0;i<rows.length;i++){
                    if(rows[i].user_id==find_id){
                        console.log('duplication');
                        res.json({"result" : "duplication"});
                        check=true;
                        break;
                    }
                }
                if(!check){
                    console.log('no duplication');
                    res.json({"result" : "no duplication"});
                }
            }else{
                res.send(err);
                console.log(err);
            }
        });
    });
    
});

module.exports = router;