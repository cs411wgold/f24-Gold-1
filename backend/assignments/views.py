import requests
from django.http import JsonResponse
from assignments.models import Assignment

CANVAS_API_URL = "https://canvas.odu.edu/api/v1/users/40892/courses/161613/assignments"
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

def list_upcoming_assignments(request):
    try:
        # Fetch assignments from the API
        assignments_data = fetch_assignments()

        # Filter upcoming assignments (for example, due after today)
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
        ]

        return JsonResponse({"assignments": filtered_assignments[:3]})
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Error fetching assignments: " + str(e)}, status=500)
