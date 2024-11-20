from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .messages import usermessages  
import json
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

@csrf_exempt
def handle_messages_request(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Add `sent_to` as a required field
            required_fields = ['sent_by', 'sent_to', 'content']
            for field in required_fields:
                if field not in data:
                    return JsonResponse({'status': 'error', 'message': f'Missing required field: {field}'}, status=400)
            
            sent_by = data['sent_by']
            sent_to = data['sent_to'] 
            content = data['content']
            sent_at = datetime.now()
            
            logger.info(f"Creating a new message with data: {data}")
            
            # Save the new message with `sent_to`
            usermessages.objects.create(
                sent_by=sent_by,
                sent_to=sent_to,  
                content=content,
                sent_at=sent_at
            )
            return JsonResponse({'status': 'success', 'message': 'Message created!'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format.'}, status=400)
    elif request.method == 'GET':
        # Retrieve all messages including `sent_to`
        all_messages = usermessages.objects.all()
        
        messages_data = [
            {
                'sent_by': message.sent_by,
                'sent_to': message.sent_to,  
                'content': message.content,
                'sent_at': message.sent_at
            }
            for message in all_messages
        ]
        
        return JsonResponse({'status': 'success', 'messages': messages_data})
