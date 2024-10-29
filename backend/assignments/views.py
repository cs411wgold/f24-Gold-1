from django.utils import timezone
from django.http import JsonResponse
from .models import Assignment

def list_upcoming_assignments(request):
    current_time = timezone.now()
    print(f"Current time: {current_time}")
    
    assignments = Assignment.objects.filter(due_at__gte=current_time).order_by('due_at')[:3]
    print(f"Assignments: {assignments}")
    
    assignments_data = [
        {
            "name": assignment.name,
            "due_at": assignment.due_at
        } for assignment in assignments
    ]
    return JsonResponse({"assignments": assignments_data})