const express = require('express');
const router = express.Router();
const dbConObj = require('../../config/db_info');	//디비 정보 import
const dbconn = dbConObj.init(); //sql 실행결과( results(배열 + json 형태)에 저장)
 

router.post('/charge', function (req, res) {
    console.log('<<COIN CHARGE>>');

    req.on('data', (data) => {
        inputData = JSON.parse(data);
        var charge_id = inputData.user_id;
        var charge_coin = inputData.knu_coin;

        var sql = 'SELECT * FROM coin WHERE user_id = ?'; 
        dbconn.query(sql,[charge_id],function (err, rows, fields) {
            if(!err){
                if(rows.length==0){
                    console.log('회원가입 되지않은 사용자가 충전 : ' + login_id);
                    res.json({"result" : "No find"});
                }
                else if(rows.length==1){
                    var before_coin = rows[0].knu_coin;
                    rows[0].knu_coin= before_coin + charge_coin;
                    console.log('사용자 : ' + charge_id + '가 ' + before_coin +  '->' + charge_coin +'충전');
                    res.json({"result" : "Success"});
                }
                else{
                    console.log('*******DB 사용자 중복********');
                    res.json({"result" : "Error"});
                }
            }
            else{
                console.log('Charge Query error : '+ err);
                res.json({"result" : err});
            }
        });
    });

    
    
});

module.exports = router;