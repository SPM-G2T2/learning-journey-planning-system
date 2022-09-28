DROP SCHEMA IF EXISTS SPM;
CREATE SCHEMA SPM ;
USE SPM;

DROP TABLE IF EXISTS Staff;
CREATE TABLE IF NOT EXISTS Staff (
Staff_ID int NOT NULL AUTO_INCREMENT,
Staff_FName varchar(50) NOT NULL,
Staff_LName varchar(50) NOT NULL,
Dept varchar(50) NOT NULL,
Email varchar(50) NOT NULL,
Role_ID varchar(20) NOT NULL,
PRIMARY KEY (Staff_ID),
FOREIGN KEY (Role_ID) REFERENCES ROLE (Role_ID)
);


DROP TABLE IF EXISTS Skill;
CREATE TABLE IF NOT EXISTS Skill (
Skill_ID int NOT NULL auto_increment,
Skill_Name varchar(50) NOT NULL,
Skill_Description varchar(255) NOT NULL,
Skill_Status varchar(10) NOT NULL,
PRIMARY KEY (Skill_ID)
);


DROP TABLE IF EXISTS Course;
CREATE TABLE IF NOT EXISTS Course (
Course_ID varchar(20) NOT NULL,
Course_Name varchar(50) NOT NULL,
Course_Desc varchar(255) NOT NULL,
Course_Status varchar(15) NOT NULL,
Course_Type varchar(10) NOT NULL,
Course_Category varchar(50) NOT NULL,
Skill_ID int NOT NULL,
PRIMARY KEY (Course_ID),
FOREIGN KEY (Skill_ID) REFERENCES Skill (Skill_ID)
);


DROP TABLE IF EXISTS Learning_journey;
CREATE TABLE IF NOT EXISTS Learning_journey (
Lj_ID int NOT NULL auto_increment,
Staff_ID int NOT NULL,
skill_ID int NOT NULL,
position_ID int NOT NULL,
Course_ID varchar(20) NOT NULL,
PRIMARY KEY (Lj_ID,Staff_ID),
FOREIGN KEY (Course_ID) REFERENCES Course (Course_ID),
FOREIGN KEY (Position_ID) REFERENCES Position (Position_ID),
FOREIGN KEY (Skill_ID) REFERENCES Skill (Skill_ID)
);


DROP TABLE IF EXISTS Role;
CREATE TABLE IF NOT EXISTS Role (
Role_ID int NOT NULL AUTO_INCREMENT,
Role_Name varchar(50) NOT NULL,
PRIMARY KEY (Role_ID)
);


DROP TABLE IF EXISTS Position;
CREATE TABLE IF NOT EXISTS Position (
Position_ID int NOT NULL auto_increment,
Skill_ID int NOT NULL,
Position_name varchar(50) NOT NULL,
Position_desc varchar(255) NOT NULL,
Position_dept varchar(20) NOT NULL,
Position_rept varchar(1000) NOT NULL,
Position_status varchar(10) NOT NULL,
PRIMARY KEY (Position_ID, Skill_ID)
);