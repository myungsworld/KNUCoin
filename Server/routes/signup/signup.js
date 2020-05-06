var express = require('express');
var router = express.Router();

var dbConObj = require('../../config/db_info');	//디비 정보 import
var dbconn = dbConObj.init(); //sql 실행결과( results(배열 + json 형태)에 저장)

// let users = [
//     {
//       id: 1,
//       name: 'alice'
//     },
//     {
//       id: 2,
//       name: 'bek'
//     },
//     {
//       id: 3,
//       name: 'chris'
//     }
// ]
  
// router.get('/users', (req, res) => {
//     console.log('who get in here/users');
//     res.json(users);
//  });
 

router.post('/signup', function (req, res) {
    
    console.log('<<Signup/signup>>');

    
    req.on('data', (data) => {
        var input_data_array= [];
        var inputData = JSON.parse(data); // JSON data 받음

        inputData = JSON.parse(data,(key, value)=>{ //JSON values -> array
            input_data_array.push(value);
        });
        input_data_array.pop();
        console.log('input_data : ' + input_data_array);

        var sql_insert = 'INSERT INTO knucoin.user (user_id, user_pwd, user_category, user_name , user_phone) VALUES(?, ?, ?, ?, ?)';
        dbconn.query(sql_insert,input_data_array, function (err, rows, fields) {//DB connect
            if (!err) {
                console.log('Query insert success');
                res.send("Success");
                res.end();
            } else {
                console.log('Query Error : ' + err);
                res.send(err);
                res.end();
            }
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
                        res.send('duplication');
                        check=true;
                        break;
                    }
                }
                if(!check){
                    console.log('no duplication');
                    res.send('no duplication');
                }
            }else{
                res.send(err);
                console.log(err);
            }
        });
    });
    
});

module.exports = router;