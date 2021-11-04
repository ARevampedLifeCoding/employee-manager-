DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db; 

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE postion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    postion_id INT
)