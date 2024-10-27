from django.utils import timezone
from django.http import JsonResponse
from assignments.assignment_models import Assignment

def list_upcoming_assignments(request):
    assignments = Assignment.objects.filter(due_at__gte=timezone.now()).order_by('due_at')[:3]
    assignments_data = [
        {
            "name": assignment.name,
            "due_at": assignment.due_at
        } for assignment in assignments
    ]
    return JsonResponse({"assignments": assignments_data})
