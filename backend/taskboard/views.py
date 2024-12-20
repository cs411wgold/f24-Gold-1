# views.py
from django.http import JsonResponse
from django.views import View
from .models import Tag, Task, SelectedTask
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@method_decorator(csrf_exempt, name='dispatch')
class SelectedTaskView(View):
    def get(self, request, task_id=None):
        if task_id:
            try:
                selected_task = SelectedTask.objects.get(task__id=task_id)
                data = {
                    'id': selected_task.task.id,
                    'title': selected_task.task.title,
                    'status': selected_task.task.status,
                    'is_selected': selected_task.is_selected
                }
                return JsonResponse(data, status=200)
            except SelectedTask.DoesNotExist:
                return JsonResponse({'error': 'Selected Task not found.'}, status=404)
        else:
            selected_tasks = SelectedTask.objects.filter(is_selected=True)
            selected_tasks_data = [
                {
                    'id': selected_task.task.id,
                    'title': selected_task.task.title,
                    'status': selected_task.task.status,
                    'is_selected': selected_task.is_selected
                }
                for selected_task in selected_tasks
            ]
            return JsonResponse({'selected_tasks': selected_tasks_data}, safe=False)

    def post(self, request):
        try:
            data = json.loads(request.body)
            task_id = data.get('task_id')

            if not task_id:
                return JsonResponse({'error': 'Task ID is required.'}, status=400)

            try:
                task = Task.objects.get(id=task_id)
            except Task.DoesNotExist:
                return JsonResponse({'error': 'Task not found.'}, status=404)

            selected_task, created = SelectedTask.objects.get_or_create(task=task)

            return JsonResponse({
                'message': 'Task has been selected successfully.',
                'task_id': selected_task.task.id,
                'title': selected_task.task.title,
                'status': selected_task.task.status
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

    def put(self, request, task_id):
        try:
            data = json.loads(request.body)

            try:
                selected_task = SelectedTask.objects.get(task__id=task_id)
            except SelectedTask.DoesNotExist:
                return JsonResponse({'error': 'Selected Task not found.'}, status=404)

            title = data.get('title', selected_task.task.title)
            status = data.get('status', selected_task.task.status)

            selected_task.task.title = title
            selected_task.task.status = status
            selected_task.task.save()

            return JsonResponse({
                'id': selected_task.task.id,
                'title': selected_task.task.title,
                'status': selected_task.task.status
            }, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

    def delete(self, request, task_id):
        try:
            selected_task = SelectedTask.objects.get(task__id=task_id)
            selected_task.delete()
            return JsonResponse({'message': 'Selected Task deleted successfully.'}, status=200)
        except SelectedTask.DoesNotExist:
            return JsonResponse({'error': 'Selected Task not found.'}, status=404)


@method_decorator(csrf_exempt, name='dispatch')
class TaskView(View):
    def get(self, request, task_id=None):
        if task_id:
            # Retrieve a specific task by ID
            try:
                task = Task.objects.get(id=task_id)
                tags = Tag.objects.filter(task=task)
                tags_data = [{'id': tag.id, 'name': tag.name, 'color': tag.color} for tag in tags]
                data = {
                    'id': task.id,
                    'title': task.title,
                    'status': task.status,
                    'tags': tags_data
                }
                return JsonResponse(data, status=200)
            except Task.DoesNotExist:
                return JsonResponse({'error': 'Task not found.'}, status=404)
        else:
            # Retrieve all tasks with their tags
            tasks = Task.objects.all()
            tasks_data = []
            for task in tasks:
                tags = Tag.objects.filter(task=task)
                tags_data = [{'id': tag.id, 'name': tag.name, 'color': tag.color} for tag in tags]
                tasks_data.append({
                    'id': task.id,
                    'title': task.title,
                    'status': task.status,
                    'tags': tags_data
                })
            return JsonResponse(tasks_data, safe=False)

    def post(self, request):
        # Create a new task
        try:
            data = json.loads(request.body)
            title = data.get('title')
            status = data.get('status', 'new')

            if not title:
                return JsonResponse({'error': 'Title is required.'}, status=400)

            task = Task.objects.create(title=title, status=status)
            return JsonResponse({'id': task.id, 'title': task.title, 'status': task.status}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

    def put(self, request, task_id):
        # Update an existing task
        try:
            task = Task.objects.get(id=task_id)
            data = json.loads(request.body)

            title = data.get('title', task.title)
            status = data.get('status', task.status)

            task.title = title
            task.status = status
            task.save()

            return JsonResponse({'id': task.id, 'title': task.title, 'status': task.status}, status=200)

        except Task.DoesNotExist:
            return JsonResponse({'error': 'Task not found.'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

    def delete(self, request, task_id):
        # Delete an existing task
        try:
            task = Task.objects.get(id=task_id)
            task.delete()
            return JsonResponse({'message': 'Task deleted successfully.'}, status=200)
        except Task.DoesNotExist:
            return JsonResponse({'error': 'Task not found.'}, status=404)
        

@csrf_exempt
def add_tag(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            tag_name = data.get('tagName')
            color = data.get('color')
            task_id = data.get('taskId')

            if not tag_name or not color or not task_id:
                return JsonResponse({'error': 'Tag name, color, and task ID are required.'}, status=400)

            # Get the task by ID
            try:
                task = Task.objects.get(id=task_id)
            except Task.DoesNotExist:
                return JsonResponse({'error': 'Task not found.'}, status=404)

            # Create the tag and associate it with the task
            tag = Tag.objects.create(name=tag_name, color=color, task=task)

            return JsonResponse({'id': tag.id, 'name': tag.name, 'color': tag.color, 'task_id': task.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)
@csrf_exempt
def update_tag(request, tag_id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            tag = Tag.objects.get(id=tag_id)

            # Update tag details from request data
            tag.name = data.get('name', tag.name)
            tag.color = data.get('color', tag.color)
            tag.save()

            return JsonResponse({
                'id': tag.id,
                'name': tag.name,
                'color': tag.color
            }, status=200)
        except Tag.DoesNotExist:
            return JsonResponse({'error': 'Tag not found.'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def delete_tag(request, tag_id):
    if request.method == 'DELETE':
        try:
            tag = Tag.objects.get(id=tag_id)
            tag.delete()
            return JsonResponse({'message': 'Tag deleted successfully.'}, status=200)
        except Tag.DoesNotExist:
            return JsonResponse({'error': 'Tag not found.'}, status=404)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def list_tags(request):
    if request.method == 'GET':
        try:
            tags = Tag.objects.all()
            tags_data = [
                {
                    'id': tag.id,
                    'name': tag.name,
                    'color': tag.color,
                    'task_id': tag.task.id
                }
                for tag in tags
            ]
            return JsonResponse({"tags": tags_data}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)