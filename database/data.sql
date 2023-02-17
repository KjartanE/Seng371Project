/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,

  PRIMARY KEY (`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `login` */

insert  into `login`(`login_id`,`username`,`password`, `email`) values 

(1,'Kjartan', 'pass', 'kjartan@email.com');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `login_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_last_name` varchar(50) NOT NULL,
  `user_first_name` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postal_code` varchar(15) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,

  PRIMARY KEY (`user_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`login_id`, `user_id`,`user_last_name`,`user_first_name`,`phone`,`address`,`city`,`state`,`postal_code`,`country`) values 

(1, 1,'Einarsson','Kjartan ','250-544-1751','123 Coding Road','Victoria','BC','123456','Canada');

/*Table structure for table `account` */

DROP TABLE IF EXISTS `accounts`;

CREATE TABLE `accounts` (
  `user_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `checking` decimal(20,2) DEFAULT NULL,
  `savings` decimal(20,2) DEFAULT NULL,
  `credit` decimal(20,2) DEFAULT NULL,
  `credit_limit` decimal(10,2) DEFAULT NULL,

  PRIMARY KEY (`account_id`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `accounts` */

insert  into `accounts`(`user_id`,`account_id`,`checking`,`savings`, `credit`,`credit_limit`) values 

(1, 1,'6066.78','6066.78','6066.78','50000.00');

/*Table structure for table `payments` */

DROP TABLE IF EXISTS `payments`;

CREATE TABLE `payments` (
  `account_id` int(11) NOT NULL,
  `check_number` varchar(50) NOT NULL,
  `payment_date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,

  PRIMARY KEY (`account_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `payments` */

insert  into `payments`(`account_id`,`check_number`,`payment_date`,`amount`) values 

(1,'HQ336336','2004-10-19','6066.78');