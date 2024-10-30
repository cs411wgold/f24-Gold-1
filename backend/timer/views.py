from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .study import StudySession  
import json
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def handle_study_request(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            required_fields = ['task_name', 'task_time', 'date_started']
            for field in required_fields:
                if field not in data:
                    return JsonResponse({'status': 'error', 'message': f'Missing required field: {field}'}, status=400)
            
            task_name = data['task_name']
            task_time = data['task_time']
            date_started = data['date_started']
            
            logger.info(f"Creating a new study session with data: {data}")
            
            task = StudySession.objects.filter(task_name=task_name).first()

            if task is None:
                StudySession.objects.create(
                    task_name=task_name,
                    task_time=task_time,
                    date_started=date_started
                )
            else:
                task.task_time += task_time
                task.save()
            return JsonResponse({'status': 'success', 'message': 'Study session created!'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format.'}, status=400)
    elif request.method == 'GET':
        study_sessions = StudySession.objects.all()
        
        study_sessions_data = [
            {
                'task_name': session.task_name,
                'task_time': session.task_time,
                'date_started': session.date_started
            }
            for session in study_sessions
        ]
        
        return JsonResponse({'status': 'success', 'study_sessions': study_sessions_data})


