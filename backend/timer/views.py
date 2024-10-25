from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .study import StudySession
import json
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def create_study_session(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            if 'study_data' not in data or not isinstance(data['study_data'], dict):
                return JsonResponse({'status': 'error', 'message': 'Missing or invalid study data.'}, status=400)
            
            study_data = data['study_data']
            required_fields = ['task_name', 'task_time', 'date_started']
            for field in required_fields:
                if field not in study_data:
                    return JsonResponse({'status': 'error', 'message': f'Missing required field: {field}'}, status=400)

            logger.info(f"Creating a new study session with data: {data}")
            StudySession.objects.create(study_data=study_data)
            return JsonResponse({'status': 'success', 'message': 'Study session created!'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format.'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'}, status=405)
