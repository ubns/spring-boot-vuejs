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

#### Image
User List
<img width="842" alt="2018-03-05 23 14 30" src="https://user-images.githubusercontent.com/32017808/36979575-5032bae2-20cb-11e8-9abb-e826c65ba85e.png">

