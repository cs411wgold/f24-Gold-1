from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json, logging
from .forms import SignUpForm, LoginForm


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
            form = LoginForm(data)
            if form.is_valid():
                email = form.cleaned_data['email']
                password = form.cleaned_data['password']
                
                # First get the user by email
                try:
                    user = User.objects.get(email=email)
                    # Then authenticate with username and password
                    user = authenticate(request, username=user.username, password=password)
                    if user is not None:
                        login(request, user)
                        return JsonResponse({'status': 'success', 'message': 'Login successful!'})
                    else:
                        return JsonResponse({'status': 'error', 'message': 'Invalid email or password.'}, status=401)
                except User.DoesNotExist:
                    return JsonResponse({'status': 'error', 'message': 'Invalid email or password.'}, status=401)
            else:
                errors = form.errors.as_json()
                return JsonResponse({'status': 'error', 'message': 'Invalid data.', 'errors': errors}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format.'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'}, status=405)


@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Received data in signup_view:", data)  # Debugging statement
            form = SignUpForm(data)
            if form.is_valid():
                user = form.save()
                logger.info(f"User saved: {user.username}")

                # Automatically log in the user after signup
                login(request, user)
                return JsonResponse({'status': 'success', 'message': 'Signup successful!'})
            else:
                print("Form validation errors:", form.errors)  # Print form errors for debugging
                return JsonResponse({'status': 'error', 'message': 'Invalid data.', 'errors': form.errors.as_json()}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format.'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'}, status=405)