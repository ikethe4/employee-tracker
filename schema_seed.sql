DROP DATABASE IF EXISTS tracker_seed_db;

CREATE DATABASE tracker_seed_db;

USE tracker_seed_db;

CREATE TABLE department(
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role(
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(30),
salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL
);

CREATE TABLE employee(
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER	
);

INSERT INTO department(name)
VALUES ("Sales"),
("Manufacturing"),
("Legal");

INSERT INTO role(name, salary, department_id)
VALUES ("machinist", 50000, 2),
("lawyer", 150000, 3),
("salesman", 85000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Willy", "Loman", 3, null),
("Johnny", "Cochran", 2, null),
("Orville", "Wright", 1, null),
("Wilber", "Wright", 1, 3),
("Atticus", "Finch", 2, 2),
("Gil", "Gunderson", 3, 1);

