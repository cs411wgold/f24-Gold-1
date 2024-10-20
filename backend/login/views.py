from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import json, logging
from .forms import SignUpForm


def hello_world(request):
    return HttpResponse("Hello, World Yuhhhh!")

def homepage(request):
    return HttpResponse("KnowTime")


logger = logging.getLogger(__name__)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            logger.debug(f"Received username: {username}")
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format.'}, status=400)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success', 'message': 'Login successful!'})
        else:
            logger.debug("Authentication failed.")
            return JsonResponse({'status': 'error', 'message': 'Invalid username or password.'})
@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = SignUpForm(data)
            if form.is_valid():
                user = form.save()
                raw_password = form.cleaned_data.get('password1')
                user = authenticate(username=user.username, password=raw_password)
                if user:
                    login(request, user)
                    return JsonResponse({'status': 'success', 'message': 'Signup successful!'})
                else:
                    return JsonResponse({'status': 'error', 'message': 'User authentication failed after signup.'})
            else:
                return JsonResponse({'status': 'error', 'message': form.errors})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format.'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'})