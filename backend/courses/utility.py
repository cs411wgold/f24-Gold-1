# /backend/courses/utility.py
import os
import django
import requests

# Setup Django environment to access models
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoConfig.settings')
django.setup()

from courses.models import Course

CANVAS_API_URL = "https://canvas.odu.edu/api/v1/users/{user_id}/courses"
ACCESS_TOKEN = "21066~GhuReAXccZe732w4RytQDT86FktFUTAGnL4VPweHkVYNn4k7FaZQDGAwyAcKzV3r"

def fetch_courses(user_id):
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    response = requests.get(CANVAS_API_URL.format(user_id=user_id), headers=headers)
    response.raise_for_status()
    return response.json()

def save_courses(user_id):
    try:
        courses = fetch_courses(user_id)
        for course in courses:
            # Extract necessary fields
            course_id = course.get('id')
            course_name = course.get('name')
            start_at = course.get('start_at')
            end_at = course.get('end_at')

            if not course_name:
                continue
            Course.objects.update_or_create(
                course_id=course_id,
                defaults={
                    'name': course_name,
                    'started_at': start_at,
                    'ended_at': end_at
                }
            )
            print(f"Course '{course['name']}' has been saved.")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching courses: {str(e)}")
    except Exception as e:
        print(f"Error saving courses: {str(e)}")

if __name__ == "__main__":
    user_id = "40892"  # Replace with actual user_id
    save_courses(user_id)
