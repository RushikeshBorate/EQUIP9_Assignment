create database RushiEquip;
use RushiEquip;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    mobile_number VARCHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by VARCHAR(50)
);
-- Insert a new user
DELIMITER $$
CREATE PROCEDURE InsertUser (
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_mobile_number VARCHAR(10),
    IN p_password VARCHAR(255),
    IN p_created_by VARCHAR(50)
)
BEGIN
    INSERT INTO users (first_name, last_name, mobile_number, password, created_by)
    VALUES (p_first_name, p_last_name, p_mobile_number, p_password, p_created_by);
END $$
DELIMITER ;

-- Select a user by mobile number
DELIMITER $$
CREATE PROCEDURE GetUser (
    IN p_mobile_number VARCHAR(10)
)
BEGIN
    SELECT * FROM users WHERE mobile_number = p_mobile_number;
END $$
DELIMITER ;

-- Update user details
DELIMITER $$
CREATE PROCEDURE UpdateUser (
    IN p_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_mobile_number VARCHAR(10),
    IN p_password VARCHAR(255),
    IN p_updated_by VARCHAR(50)
)
BEGIN
    UPDATE users
    SET first_name = p_first_name,
        last_name = p_last_name,
        mobile_number = p_mobile_number,
        password = p_password,
        updated_by = p_updated_by
    WHERE id = p_id;
END $$
DELIMITER ;

-- Delete a user
DELIMITER $$
CREATE PROCEDURE DeleteUser (
    IN p_id INT
)
BEGIN
    DELETE FROM users WHERE id = p_id;
END $$
DELIMITER ;