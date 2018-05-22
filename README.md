### Spring Boot + Vue.js
Create Single Page Application 

#### Preparation
◇ Create DB

```mysql
CREATE DATABASE `spa`;
```

◇　Create Table

```mysql
CREATE TABLE user(
	`id` int(8) NOT NULL AUTO_INCREMENT, 
	`name` varchar(20) NOT NULL, 
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL, 
	PRIMARY KEY (`id`)
);
```

```mysql
CREATE TABLE post(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  author_id INTEGER,
  title TEXT,
  content LONGTEXT,
  create_time DATE,
  update_time DATE
);


```

◇ Change Filename  
application-dev.yml  
↓  
application.yml


