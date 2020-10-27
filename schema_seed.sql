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
department_id INTEGER NOT NULL,
INDEX role_index(role_id),
CONSTRAINT role_fk FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER,
INDEX mgr_index(manager_id),
CONSTRAINT manager_fk FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

INSERT INTO department (name)
VALUES ("Legal"),
("Manufacturing"),
("Sales");

INSERT INTO role(name, salary, department_id)
VALUES ("Lawyer", 150000, 1),
("Machinist", 65000, 2),
("Salesman", 90000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Atticus", "Finch", 1, null),
("Vicent", "Gambini", 1, 1),
("Orville", "Wright", 2, null),
("Wilbur", "Wright", 2, 3),
("Willy", "Loman", 3, null),
("Gil", "Gunderson", 3, 5);
