GRANT ALL PRIVILEGES ON DATABASE knowtime TO kt_admin;

-- Drop table if it exists
DROP TABLE IF EXISTS timer_studysession;

-- Create table statement for StudySession
CREATE TABLE timer_studysession (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(255),
    task_time INTEGER,
    date_started TIMESTAMP
);
