테스트 하기 위한 테이블
CREATE TABLE `test` (  
  `id` int NOT NULL AUTO_INCREMENT,  
  `title` varchar(100) NOT NULL,  
  PRIMARY KEY (`id`)  
) 

서버 실행  
bin 폴더로 가서 node www

- 테이블 모든 행 검색
GET /test  
Host : localhost:3000  
Content-Type : application/json  
  
- 특정 index 검색  
GET /test/1  
Host : localhost:3000  
Content-Type : application/json  
  
- 특정 index 삭제  
DELETE test/1  
Host : localhost:3000  
Content-Type : application/json  
  
- 데이터 생성  
POST /test  
Host : localhost:3000  
Content-Type : application/json  
Parameter  
  - "title" : "~"  

- 특정 index 데이터 수정
PUT /test/1  
Host : localhost:3000  
Content-Type : application/json  
Parameter  
  - "title" : "~" 
