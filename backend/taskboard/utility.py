import os
import django

# Setup Django to run in the script
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoConfig.settings')
django.setup()

from assignments.models import Assignment
from taskboard.models import Task

# Function to create tasks from assignments
def populate_tasks_from_assignments():
    try:
        # Fetch all assignments from the database
        assignments = Assignment.objects.all()

        # Iterate through each assignment and create a Task
        for assignment in assignments:
            task, created = Task.objects.get_or_create(
                title=assignment.name,
                defaults={'id': assignment.id, 'status': 'new'}
            )

            if created:
                print(f"Task created for assignment '{assignment.name}'.")
            else:
                print(f"Task for assignment '{assignment.name}' already exists.")
    
    except Exception as e:
        print(f"An error occurred while creating tasks: {e}")

if __name__ == "__main__":
    populate_tasks_from_assignments()
