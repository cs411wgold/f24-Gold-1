# utility.py in /backend/grades

import os
import json
import django

# Setup Django to run in the script
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoConfig.settings')
django.setup()

from assignments.models import Assignment
from grades.models import Grade

# Function to create grades for each assignment from a JSON file
def populate_grades():
    # Load grades from the JSON file
    grades_file_path = os.path.join(os.path.dirname(__file__), 'fixtures', 'grades_data.json')
    
    with open(grades_file_path, 'r') as file:
        grades_data = json.load(file)
    
    for grade_entry in grades_data:
        assignment_id = grade_entry["fields"]["assignment"]
        grade = grade_entry["fields"]["grade"]

        try:
            # Get the assignment from the database
            assignment = Assignment.objects.get(id=assignment_id)

            # Create or update the grade for this assignment
            grade_obj, created = Grade.objects.get_or_create(
                assignment=assignment,
                defaults={'grade': grade}
            )

            if created:
                print(f"Grade created for assignment '{assignment.name}' with grade {grade}.")
            else:
                # Update the existing grade if needed
                grade_obj.grade = grade
                grade_obj.save()
                print(f"Grade updated for assignment '{assignment.name}' with grade {grade}.")

        except Assignment.DoesNotExist:
            print(f"Assignment with ID {assignment_id} does not exist.")

if __name__ == "__main__":
    populate_grades()
