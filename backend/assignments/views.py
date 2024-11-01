import requests
from django.http import JsonResponse
from assignments.utility import fetch_all_assignments
from datetime import datetime
from django.shortcuts import render
from assignments.models import Assignment


def list_assignments_from_db(request):
    try:
        # Fetch assignments from the API
        assignments_data = fetch_all_assignments()

        
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

        # Return only the first 3 upcoming assignments
        return JsonResponse({"assignments": filtered_assignments})

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Error fetching assignments: " + str(e)}, status=500)

    except Exception as e:
        return JsonResponse({"error": "Unexpected error: " + str(e)}, status=500)
   


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
