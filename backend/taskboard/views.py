from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .modals import Task
import json

def get_task_by_id(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        data = {
            'id': task.id,
            'title': task.title,
            'status': task.status,
        }
        return JsonResponse(data, status=200)
    except Task.DoesNotExist:
        return JsonResponse({'error': 'Task not found.'}, status=404)
    
tasks = []

@csrf_exempt
def add_task(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data.get('title')
            status = data.get('status')

            if not title or not status:
                return JsonResponse({'error': 'Title and status are required.'}, status=400)

            task = Task.objects.create(title=title, status=status)
            return JsonResponse({'id': task.id, 'title': task.title, 'status': task.status}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

# Function to list tasks in the "New" column
@csrf_exempt
def list_tasks(request):
    try:
        # Fetch tasks with status "new" from the Task model
        new_tasks = Task.objects.filter(status="new").order_by('-created_at')
        
        # Prepare the data to be returned
        tasks_data = [
            {
                "id": task.id,
                "name": task.name,
                "description": task.description,
                "status": task.status
            }
            for task in new_tasks
        ]

        # Return the tasks as JSON data
        return JsonResponse({"tasks": tasks_data})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
