import requests
from datetime import datetime

REGGIE_ACCESS_TOKEN = "21066~GhuReAXccZe732w4RytQDT86FktFUTAGnL4VPweHkVYNn4k7FaZQDGAwyAcKzV3r"  # Replace with your Canvas token

def list_upcoming_assignments(course_id):
    # Canvas API URL for the assignments
    user_id = 40892  # Replace with actual user_id if needed
    canvas_api_url = f"https://canvas.odu.edu/api/v1/users/{user_id}/courses/{course_id}/assignments"

    headers = {
        'Authorization': f'Bearer {REGGIE_ACCESS_TOKEN}'
    }

    try:
        # Make the GET request to the Canvas API
        response = requests.get(canvas_api_url, headers=headers)

        # Raise an error if the request failed
        response.raise_for_status()

        # Parse the response JSON to get assignments data
        assignments = response.json()

        # Sort assignments by due date and filter out assignments without a due date
        assignments = [
            assignment for assignment in assignments
            if assignment.get('due_at') is not None
        ]
        assignments.sort(key=lambda x: datetime.strptime(x['due_at'], "%Y-%m-%dT%H:%M:%SZ"))

        # Get the next 3 upcoming assignments
        upcoming_assignments = assignments[:3]

        # Return the assignments data
        return upcoming_assignments

    except requests.exceptions.RequestException as e:
        # Raise the exception to be handled by the view
        raise Exception(f"Failed to fetch assignments: {e}")