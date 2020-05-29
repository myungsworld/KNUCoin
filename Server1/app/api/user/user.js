const database = require('../../../data')
const crypto = require('crypto');
const moment = require('moment')

require('moment-timezone')
moment.tz.setDefault('Asia/Seoul')
//1분 * 1시간 * 24시간 * 3일 * 60 * 24
let expireDay = 60000 * 3

exports.check = (req, res) => {
    console.log('check ID duplication')
    var user_id = req.body.user_id

    database.User.findAll({
        where: {
            user_id: user_id
        }
    }).then( (results) => {
        if(!results.length) {
            console.log(user_id, 'is not duplicated')
            res.status(200).json({ result : "no duplication" })
        }
        else {
            console.log(user_id, 'is duplicated')
            res.status(404).json({ result : "duplication" })
        }
    }).catch( () => res.status(404).json({ result: "Undefiend error" }))
}

exports.signup = (req, res) => {
    console.log('Signup')

    var body = req.body
    var user_id = body.user_id
    var pwd = body.pwd
    var category = body.category
    var name = body.name
    var phone = body.phone

    var date = moment().format('YYYY-MM-DD HH:mm:ss')

    crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(pwd, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
            pwd = key.toString('base64')
            salt = buf.toString('base64')

            database.User.create({
                user_id: user_id,
                pwd: pwd,
                salt, salt,
                category: category,
                name: name,
                phone: phone,
                signup_time: date

            }).then( () => {
                console.log(user_id, 'successed to sign up')
                res.status(200).json({ result : "Success" })
            }).catch( () => {
                console.log(user_id, 'failed to sign up')
                res.status(404).json({ result: "Undefined error" })
            })            
        })
    })
}

exports.autologin = (req, res) => {
    console.log('Auto Login')

    //cookie.session_id 검사
    var cookie_session_id = req.cookies.session_id

    //session_id 쿠키가 없을 때
    if(cookie_session_id === undefined) {
        console.log('There is no Cookie')
        res.status(404).json({ result : "There is no Cookie" })
        return
    } else {
        //있을때
        database.AutoLogin.findOne({
            where: {
                session_id: cookie_session_id
            }
        }).then( (result) => {
            let diff = moment.duration(moment(result.expire_date).diff(moment())).asDays()

            //session_id 도 동일, 만료기간도 만족
            if(diff > 0) {
                //데이터베이스의 세션아이디 동기화

                database.AutoLogin.destroy({
                    where: {
                        user_id: result.user_id
                    }
                }).then( () => {
                
                    database.AutoLogin.create({
                        session_id: req.session.id,
                        user_id: result.user_id,
                        expire_date: moment().add(3, 'minutes').format('YYYY-MM-DD HH:mm:ss')
                    }).then( () => {
                        
                        req.session.user_id = result.user_id

                        console.log(req.session.user_id, 'successed to auto login')
                        res.cookie('session_id', req.session.id, {maxAge: expireDay, httpOnly: true})
                        res.status(200).json({ result : 'Success' })
                        
                    }).catch( (err) => {
                        console.log('Undefined error', err)
                        res.status(404).json({ result : 'Undefined error'})
                    })

                }).catch( () => {
                    console.log('wrong deleted')
                    res.status(404).json({result: 'Wrong deleted'})
                })

                
            } else {
                //자동로그인 실패
                console.log('Expired auto login period')
                res.status(404).json({ result : 'auto login period is expired'})
            }

        }).catch( (err) => {
            console.log('There is no matched session_id')
            res.status(404).json({ result : 'There is no matched session_id' })
        })
    }
}

exports.login = (req, res) => {
    console.log('Login')

    var login_id = req.body.user_id
    var login_pwd = req.body.pwd

    database.User.findOne({
        where: {
            user_id: login_id
        }
    }).then( (result) => {

        crypto.randomBytes(64, (err, buf) => {
            crypto.pbkdf2(login_pwd, result.salt, 100000, 64, 'sha512', (err, key) => {

                if(result.pwd === key.toString('base64')){
                    //쿠키만료후 수동로그인시 디비 세션아이디 처리
                    
                    database.AutoLogin.destroy({
                        where: {
                            user_id: login_id
                        }
                    }).then( () => {
                    
                        database.AutoLogin.create({
                            session_id: req.session.id,
                            user_id: login_id,
                            expire_date: moment().add(3, 'minutes').format('YYYY-MM-DD HH:mm:ss')
                        }).then( () => {
                            
                            req.session.user_id = login_id

                            console.log(req.session.user_id, 'successed to login')
                            res.cookie('session_id', req.session.id, {maxAge: expireDay, httpOnly: true})
                            res.status(200).json({ result : 'Success' })

                        }).catch( (err) => {
                            console.log('Undefined error', err)
                            res.status(404).json({ result : 'Undefined error'})
                        })

                    }).catch( () => {
                        console.log('wrong deleted')
                        res.status(404).json({result: 'Wrong deleted'})
                    })

                } else {
                    console.log('Invalid password')
                    res.status(404).json({ result : 'Invalid password'})
                }
            })
        })

    }).catch( () => {
        console.log(login_id, 'is invalid User')
        res.status(404).json({ result : 'Invalid User' })
    })
    
}