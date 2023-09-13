INSERT INTO department (id, name)
VALUES 
    (001, 'maintenance'),
    (002, 'customer service'),
    (003, 'engineering');
   

INSERT INTO role (id, title, salary, department_id)
VALUES
(1001, "maintenance", 30000, 001),
(1002, "customer service", 35000, 002),
(1003, "host", 40000, 002),
(1004, "designer", 80000, 003),
(1005, "trail-builder", 70000, 001),
(1006, "activities director", 65000, 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(2001, "Alexanadra", "Zykova", 1004, 3001),
(2002, "Riley", "Song", 1006, 3002),
(2003, "Leo", "Gurgel", 1004, 3001),
(2004, "Prashant", "Vasudeva", 1005, 3001),
(2005, "Sal", "Hobbi", 1003, 3002),
(2006, "Mark", "Alfano", 1001, 3001);