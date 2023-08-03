CREATE DATABASE ResistorDB;
GO

USE ResistorDB;
GO

CREATE TABLE ColorCode (
    id INT IDENTITY(1,1) PRIMARY KEY,
    color NVARCHAR(50) NOT NULL,
    firstDigit INT,
    secondDigit INT,
    multiplier FLOAT,
    tolerance FLOAT
);

INSERT INTO ColorCode (color, firstDigit, secondDigit, multiplier, tolerance)
VALUES
('black', 0, 0, 1, NULL),
('brown', 1, 1, 10, 1),
('red', 2, 2, 100, 2),
('orange', 3, 3, 1000, NULL),
('yellow', 4, 4, 10000, NULL),
('green', 5, 5, 100000, 0.5),
('blue', 6, 6, 1000000, 0.25),
('violet', 7, 7, 10000000, 0.1),
('gray', 8, 8, NULL, 0.05),
('white', 9, 9, NULL, NULL),
('gold', NULL, NULL, 0.1, 5),
('silver', NULL, NULL, 0.01, 10);
