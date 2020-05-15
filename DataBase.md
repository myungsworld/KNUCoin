### SCHEMA
```sql
CREATE SCHEMA IF NOT EXISTS `knucoin` DEFAULT CHARACTER SET utf8;
USE `knucoin`;
```

### USER
```sql
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` varchar(30) NOT NULL,
  `pwd` varchar(6000) NOT NULL,
  `salt` varchar(6000) NOT NULL,
  `category` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `signup_time` varchar(30) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
### COIN
```sql
CREATE TABLE IF NOT EXISTS `coin` (
  `user_id` varchar(30) NOT NULL,
  `knu_coin` int(11) DEFAULT NULL,
  `event_coin` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_coin_user_idx` (`user_id`),
  CONSTRAINT `fk_coin_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
