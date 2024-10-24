from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import json, logging
from .forms import SignUpForm, LoginForm
from login.utils import list_upcoming_assignments 

CANVAS_BASE_URL = "https://canvas.odu.edu"  # Replace with your school's Canvas URL
REGGIE_ACCESS_TOKEN = "21066~GhuReAXccZe732w4RytQDT86FktFUTAGnL4VPweHkVYNn4k7FaZQDGAwyAcKzV3r"  # Replace with your Canvas token
REGGIE_STUDENT_ID ="40892"
CS411W_COURSE_ID="161613"

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
                user = authenticate(request, email=email, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({'status': 'success', 'message': 'Login successful!'})
                else:
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
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'}, status=405)
from django.http import JsonResponse

@csrf_exempt
def list_upcoming_assignments_view(request, course_id):
    try:
        # Call the utility function to get assignments
        upcoming_assignments = list_upcoming_assignments(course_id)
        return JsonResponse({"message": "Success", "assignments": upcoming_assignments}, status=200)
    except Exception as e:
        logger.error(f"Error fetching assignments: {str(e)}")
        return JsonResponse({"message": "Error", "details": str(e)}, status=500)

