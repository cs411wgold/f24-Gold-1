import requests
from django.http import JsonResponse
from assignments.models import Assignment
from datetime import datetime

CANVAS_API_URL = "https://canvas.odu.edu/api/v1/users/40892/courses/161613/assignments"
REGGIE_ACCESS_TOKEN = "21066~GhuReAXccZe732w4RytQDT86FktFUTAGnL4VPweHkVYNn4k7FaZQDGAwyAcKzV3r"


# Function to fetch assignment data from Canvas, handling pagination
def fetch_all_assignments():
    headers = {
        "Authorization": f"Bearer {REGGIE_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    
    assignments = []
    page = 1
    while True:
        response = requests.get(f"{CANVAS_API_URL}?per_page=100&page={page}&order_by=due_at", headers=headers)
        response.raise_for_status()
        data = response.json()
        
        # If the response is a list, continue extending, otherwise, handle it as a dictionary
        if isinstance(data, list):
            if not data:
                # No more data, break out of the loop
                break
            assignments.extend(data)
        elif isinstance(data, dict) and 'assignments' in data:
            assignments.extend(data['assignments'])
        else:
            # Unexpected response format
            break

        page += 1

    return assignments


# View to list upcoming assignments
def list_upcoming_assignments(request):
    try:
        # Fetch assignments from the API
        assignments_data = fetch_all_assignments()

        # Filter upcoming assignments - due today or later
        today = datetime.now().date()
        filtered_assignments = [
            {
                "id": assignment['id'],
                "name": assignment['name'],
                "description": assignment.get('description', ''),
                "course_id": assignment['course_id'],
                "due_at": assignment['due_at'],
                "points_possible": assignment.get('points_possible', None),
                "grading_type": assignment.get('grading_type', None),
                "submission_types": ', '.join(assignment.get('submission_types', [])),
            }
            for assignment in assignments_data
            if assignment.get('due_at') and datetime.strptime(assignment['due_at'], "%Y-%m-%dT%H:%M:%SZ").date() >= today
        ]

        # Return only the first 3 upcoming assignments
        return JsonResponse({"assignments": filtered_assignments})

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Error fetching assignments: " + str(e)}, status=500)

    except Exception as e:
        return JsonResponse({"error": "Unexpected error: " + str(e)}, status=500)
