## 회원가입
* Request   
  * URL   
    POST /user/signup   
    Host : localhost:3000   
    Content-Type : application/json  
    Accept : application/json   
  * Parameter   
    Name|Description|Required
    ---|---|---
    user_id|사용자 ID|O
    pwd|사용자 비밀번호|O
    category|사용자 구분|O
    name|사용자 이름|O
    phone|사용자 휴대폰 번호|O
    
* Response   
  * HTTP Code   
    Name|State
    ---|---
    성공시 | 200
    실패 | 404
  * Key
    Name|Description
    ---|---
    result|Success or err
  
## 아이디 중복체크
* Request   
  * URL   
    POST /user/check   
    Host : localhost:3000   
    Content-Type : application/json  
    Accept : application/json  
  * Parameter   
    Name|Description|Required
    ---|---|---
    user_id|사용자 ID|O

* Response   
  * HTTP Code   
    Name|State
    ---|---
    성공시 | 200
    실패 | 404
  * Key
    Name|Description
    ---|---
    result|no duplication or puclication
     
 ## 로그인
* Request   
  * URL   
    POST /user/login   
    Host : localhost:3000   
    Content-Type : application/json  
    Accept : application/json  
  * Parameter   
    Name|Description|Required
    ---|---|---
    user_id|사용자 ID|O
    pwd|사용자 비밀번호|O

* Response   
  * HTTP Code   
    Name|State
    ---|---
    성공시 | 200
    실패 | 404
  * Key
    Name|Description
    ---|---
    result|Success or Fail
