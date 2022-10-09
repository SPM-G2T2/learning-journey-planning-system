DROP SCHEMA IF EXISTS learning_journey_planning_system;
CREATE SCHEMA learning_journey_planning_system;
USE learning_journey_planning_system;


DROP TABLE IF EXISTS Role;
CREATE TABLE IF NOT EXISTS Role (
Role_ID int NOT NULL AUTO_INCREMENT,
Role_Name varchar(50) NOT NULL,
PRIMARY KEY (Role_ID)
);


insert into Role values (1, "User");
insert into Role values (2, "Trainer");
insert into Role values (3, "Manager");
insert into Role values (4, "Admin");


DROP TABLE IF EXISTS Staff;
CREATE TABLE IF NOT EXISTS Staff (
Staff_ID int NOT NULL AUTO_INCREMENT,
Staff_FName varchar(50) NOT NULL,
Staff_LName varchar(50) NOT NULL,
Dept varchar(50) NOT NULL,
Email varchar(50) NOT NULL,
Role_ID int NOT NULL,
FOREIGN KEY (Role_ID) REFERENCES ROLE (Role_ID),
PRIMARY KEY (Staff_ID)
);


insert into Staff values (1, "Mary", "Lee", "Operations", "mary_lee@all-in-one.com", 3);
insert into Staff values (2, "Sally", "Loh", "Human Resource", "sally_loh@all-in-one.com", 4);
insert into Staff values (3, "Bob", "Tan", "IT Team", "bob_tan@all-in-one.com", 1);
insert into Staff values (4, "Tom", "Soh", "Sales", "tom_soh@all-in-one.com", 2);


DROP TABLE IF EXISTS Position;
CREATE TABLE IF NOT EXISTS Position (
Position_ID int NOT NULL auto_increment,
Position_Name varchar(50) NOT NULL,
Position_Desc varchar(255) NOT NULL,
Position_Dept varchar(20) NOT NULL,
Position_Res varchar(1000) NOT NULL,
Position_Status varchar(10) NOT NULL,
PRIMARY KEY (Position_ID)
);


DROP TABLE IF EXISTS Skill;
CREATE TABLE IF NOT EXISTS Skill (
Skill_ID int NOT NULL auto_increment,
Skill_Name varchar(50) NOT NULL,
Skill_Desc varchar(255) NOT NULL,
Skill_Status varchar(10) NOT NULL,
PRIMARY KEY (Skill_ID)
);


DROP TABLE IF EXISTS Position_Skill;
CREATE TABLE IF NOT EXISTS Position_Skill (
Position_ID int NOT NULL,
Skill_ID int NOT NULL,
FOREIGN KEY (Position_ID) REFERENCES Position (Position_ID),
FOREIGN KEY (Skill_ID) REFERENCES Skill (Skill_ID),
PRIMARY KEY (Position_ID, Skill_ID)
);


DROP TABLE IF EXISTS Course;
CREATE TABLE IF NOT EXISTS Course (
Course_ID varchar(20) NOT NULL,
Course_Name varchar(50) NOT NULL,
Course_Desc varchar(255) NOT NULL,
Course_Status varchar(15) NOT NULL,
Course_Type varchar(10) NOT NULL,
Course_Category varchar(50) NOT NULL,
PRIMARY KEY (Course_ID)
);


DROP TABLE IF EXISTS Skill_Course;
CREATE TABLE IF NOT EXISTS Skill_Course (
Skill_ID int NOT NULL,
Course_ID varchar(20) NOT NULL,
FOREIGN KEY (Skill_ID) REFERENCES Skill (Skill_ID),
FOREIGN KEY (Course_ID) REFERENCES Course (Course_ID),
PRIMARY KEY (Skill_ID, Course_ID)
);


DROP TABLE IF EXISTS Staff_Skill;
CREATE TABLE IF NOT EXISTS Staff_Skill (
Staff_ID int NOT NULL,
Skill_ID int NOT NULL,
FOREIGN KEY (Staff_ID) REFERENCES Staff (Staff_ID),
FOREIGN KEY (Skill_ID) REFERENCES Skill (Skill_ID),
PRIMARY KEY (Staff_ID, Skill_ID)
);


DROP TABLE IF EXISTS Learning_Journey;
CREATE TABLE IF NOT EXISTS Learning_Journey (
LJ_ID int NOT NULL auto_increment,
Staff_ID int NOT NULL,
Position_ID int NOT NULL,
Skill_ID int NOT NULL,
Course_ID varchar(20) NOT NULL,
FOREIGN KEY (Staff_ID) REFERENCES Staff (Staff_ID),
FOREIGN KEY (Position_ID) REFERENCES Position (Position_ID),
FOREIGN KEY (Skill_ID) REFERENCES Skill (Skill_ID),
FOREIGN KEY (Course_ID) REFERENCES Course (Course_ID),
PRIMARY KEY (LJ_ID, Staff_ID)
);