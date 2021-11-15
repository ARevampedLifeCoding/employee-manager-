USE employee_db;

INSERT INTO departments (name)
VALUES ('Tech Support'),
('Software Intern'),
('Software Engineer'),
('Management'),
('Zar');

INSERT INTO roles (title, departments_id)
VALUES ('Tech Support',1),
('Software Intern',2),
('Software Engineer',3),
('Management',4),
('Zar',5);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Randy','Langston',5),
('Stephenie','Langston',4),
('Auggie','Langston',3),
('Ally','Langston',2),
('Jackson','Langston',1);