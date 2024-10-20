GRANT ALL PRIVILEGES ON DATABASE knowtime TO kt_admin;

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Insert a user
INSERT INTO users (first_name, last_name, email, password)
VALUES ('Jimbo', 'Bob', 'jimbo@odu.edu', 'password123');

