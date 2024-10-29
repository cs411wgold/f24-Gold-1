import requests
import psycopg2  # Assuming PostgreSQL, use the appropriate library for your database
from psycopg2 import sql
import json
from datetime import datetime
'''
# Database credentials
DB_NAME = "knowtime"
DB_USER = "kt_admin"
DB_PASSWORD = "TestMe123"
DB_HOST = "localhost"
DB_PORT = "5432"
'''

# Canvas API details
user_id = 40892  
course_id = 161613
CANVAS_API_URL = "https://canvas.odu.edu/api/v1/users/40892/courses/161613/assignments"  # endpoint for assignments
REGGIE_ACCESS_TOKEN = "21066~GhuReAXccZe732w4RytQDT86FktFUTAGnL4VPweHkVYNn4k7FaZQDGAwyAcKzV3r"

# Function to fetch assignment data from Canvas
def fetch_assignments():
    headers = {
        "Authorization": f"Bearer {REGGIE_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    response = requests.get(CANVAS_API_URL, headers=headers)
    response.raise_for_status()
    return response.json()

# Function to insert assignments into the database
def insert_assignments(assignments):
    try:
        # Connect to your PostgreSQL database
        connection = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        cursor = connection.cursor()

        # Iterate over the list of assignments and insert them into the database
        for assignment in assignments:
            insert_query = sql.SQL("""
                INSERT INTO assignments (id, name, description, course_id, due_at, points_possible, grading_type, submission_types)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING
            """)

            # Prepare the data to be inserted, handling None values
            assignment_data = (
                assignment.get('id'),
                assignment.get('name'),
                assignment.get('description', ''),
                assignment.get('course_id'),
                datetime.strptime(assignment['due_at'], "%Y-%m-%dT%H:%M:%SZ") if assignment.get('due_at') else None,
                assignment.get('points_possible', None),
                assignment.get('grading_type', None),
                assignment.get('submission_types', None)
            )

            cursor.execute(insert_query, assignment_data)

        # Commit the transaction
        connection.commit()

    except Exception as e:
        print("An error occurred:", e)

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

if __name__ == "__main__":
    # Fetch assignments from Canvas API
    try:
        assignments = fetch_assignments()
        if assignments:
            # Insert fetched assignments into the database
            insert_assignments(assignments)
            print("Assignments successfully imported into the database.")
        else:
            print("No assignments were found.")
    except requests.exceptions.RequestException as e:
        print("Error fetching assignments:", e)
