### Spring Boot + Vue.js
Create Single Page Application 

#### Preparation
◇ Create DB

```mysql
CREATE DATABASE `spa`;
```

◇　Create Table

```mysql
CREATE TABLE `user` (
	`id` int(8) NOT NULL AUTO_INCREMENT, 
	`name` varchar(20) NOT NULL, 
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL, 
	PRIMARY KEY (`id`)
);
```

◇ Change Filename  
application-dev.yml  
↓  
application.yml


