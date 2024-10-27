CREATE TABLE assignments (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    course_id INT,
    due_at TIMESTAMP,
    points_possible FLOAT,
    grading_type VARCHAR(50),
    submission_types VARCHAR(50)
);
