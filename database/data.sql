
/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userLastName` varchar(50) NOT NULL,
  `userFirstName` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `addressLine1` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `creditLimit` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`userId`,`userName`,`userLastName`,`userFirstName`,`phone`,`addressLine1`,`city`,`state`,`postalCode`,`country`,`creditLimit`) values 

(1,'Kjartan','Einarsson','Kjartan ','250-544-1751','123 Coding Road','Victoria','BC','123456','Canada','50000.00');


/*Table structure for table `payments` */

DROP TABLE IF EXISTS `payments`;

CREATE TABLE `payments` (
  `userId` int(11) NOT NULL,
  `checkNumber` varchar(50) NOT NULL,
  `paymentDate` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`userId`,`checkNumber`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `payments` */

insert  into `payments`(`userId`,`checkNumber`,`paymentDate`,`amount`) values 

(1,'HQ336336','2004-10-19','6066.78');


/*Table structure for table `account` */

DROP TABLE IF EXISTS `accounts`;

CREATE TABLE `accounts` (
  `accountId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `checking` decimal(20,2) NOT NULL,
  `savings` decimal(20,2) NOT NULL,
  `credit` decimal(20,2) NOT NULL,
  PRIMARY KEY (`userId`,`accountId`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `accounts` */

insert  into `accounts`(`userId`,`accountId`,`checking`,`savings`, `credit`) values 

(1, 1,'6066.78','6066.78','6066.78');