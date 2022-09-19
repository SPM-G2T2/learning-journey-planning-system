
DROP SCHEMA IF EXISTS Staff;
CREATE SCHEMA Staff;

DROP TABLE IF EXISTS Staff;
CREATE TABLE IF NOT EXISTS Staff (
Staff_ID int NOT NULL,
Staff_FName varchar(50) NOT NULL,
Staff_LName varchar(50) NOT NULL,
Dept varchar(50) NOT NULL,
Email varchar(50) NOT NULL,
Role varchar(20) NOT NULL,
Lj_ID varchar(32) NOT NULL,
PRIMARY KEY (Staff_ID),
FOREIGN KEY (Role) REFERENCES ROLE (Role_Name),
FOREIGN KEY (Lj_ID) REFERENCES Learning_journey (Lj_ID)
);

DROP SCHEMA IF EXISTS Skill;
CREATE SCHEMA Skill;

DROP TABLE IF EXISTS Skill;
CREATE TABLE IF NOT EXISTS Skill (
Skill_ID varchar(32) NOT NULL,
Skill_Name varchar(50) NOT NULL,
Skill_Description varchar(255) NOT NULL,
Role varchar(20) NOT NULL,
Course_ID varchar(20) NOT NULL,
PRIMARY KEY (Skill_ID),
FOREIGN KEY (Role) REFERENCES ROLE (Role_Name),
FOREIGN KEY (Course_ID) REFERENCES Skill (Course_ID)
);

DROP SCHEMA IF EXISTS Course;
CREATE SCHEMA Course;

DROP TABLE IF EXISTS Course;
CREATE TABLE IF NOT EXISTS Course (
Course_ID varchar(20) NOT NULL,
Course_Name varchar(50) NOT NULL,
Course_Desc varchar(255) NOT NULL,
Course_Status varchar(15) NOT NULL,
Course_Type varchar(10) NOT NULL,
Course_Category varchar(50) NOT NULL,
Skill_ID varchar(32) NOT NULL,
PRIMARY KEY (Course_ID),
FOREIGN KEY (Skill_ID) REFERENCES Skill (Skill_ID)
);


DROP SCHEMA IF EXISTS Learning_journey;
CREATE SCHEMA Learning_journey;

DROP TABLE IF EXISTS Learning_journey;
CREATE TABLE IF NOT EXISTS Learning_journey (
Lj_ID varchar(32) NOT NULL,
Lj_Name varchar(32) NOT NULL,
Lj_Desc varchar(240) NOT NULL,
Course_ID varchar(20) NOT NULL,
PRIMARY KEY (Lj_ID),
FOREIGN KEY (Course_ID) REFERENCES Course (Course_ID)
);

DROP SCHEMA IF EXISTS Role;
CREATE SCHEMA Role;

DROP TABLE IF EXISTS Role;
CREATE TABLE IF NOT EXISTS Role (
Role_ID int NOT NULL,
Role_Name varchar(20) NOT NULL,
Skill_ID varchar(32) NOT NULL,
PRIMARY KEY (Role_ID),
FOREIGN KEY (Skill_ID) REFERENCES Skill (Skill_ID)
);

DROP SCHEMA IF EXISTS Registration;
CREATE SCHEMA Registration;

DROP TABLE IF EXISTS Registration;
CREATE TABLE IF NOT EXISTS Registration (
Reg_ID int NOT NULL,
Course_ID varchar(20) NOT NULL,
Staff_ID int NOT NULL,
Reg_Status varchar(20) NOT NULL,
Completion_Status varchar(20) NOT NULL,
PRIMARY KEY (Reg_ID),
FOREIGN KEY (Course_ID) REFERENCES Course (Course_ID),
FOREIGN KEY (Staff_ID) REFERENCES Staff (Staff_ID)
);