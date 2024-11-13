from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Friend, User

from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

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
            form = SignUpForm(data)
            if form.is_valid():
                user = form.save()
                return JsonResponse({'status': 'success', 'message': 'Signup successful!'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid data.', 'errors': form.errors.as_json()}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format.'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'}, status=405)
    
@csrf_exempt
def list_upcoming_assignments_view(request, course_id):
    try:
        # Call the utility function to get assignments
        upcoming_assignments = list_upcoming_assignments(course_id)
        return JsonResponse({"message": "Success", "assignments": upcoming_assignments}, status=200)
    except Exception as e:
        logger.error(f"Error fetching assignments: {str(e)}")
        return JsonResponse({"message": "Error", "details": str(e)}, status=500)

@csrf_exempt
def change_password_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Check if all required fields are present
            required_fields = ['current_password', 'new_password', 'confirm_password']
            if not all(field in data for field in required_fields):
                return JsonResponse({
                    'status': 'error',
                    'message': 'Missing required fields'
                }, status=400)

            # Check if user is authenticated
            user = request.user
            if not user.is_authenticated:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Authentication required'
                }, status=401)

            # Verify current password
            if not user.check_password(data['current_password']):
                return JsonResponse({
                    'status': 'error',
                    'message': 'Current password is incorrect'
                }, status=403)  

            # Verify new password matches confirmation
            if data['new_password'] != data['confirm_password']:
                return JsonResponse({
                    'status': 'error',
                    'message': 'New passwords do not match'
                }, status=400)

            # Validate new password
            try:
                validate_password(data['new_password'], user)
            except ValidationError as errors:
                return JsonResponse({
                    'status': 'error',
                    'message': errors.messages
                }, status=400)

            # Set new password
            user.set_password(data['new_password'])
            user.save()

            return JsonResponse({
                'status': 'success',
                'message': 'Password updated successfully'
            })

        except json.JSONDecodeError:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid JSON format'
            }, status=400)
        except Exception as e:
            # Optionally log the error here
            return JsonResponse({
                'status': 'error',
                'message': 'An unexpected error occurred'
            }, status=500)
    else:
        return JsonResponse({
            'status': 'error',
            'message': 'Only POST requests are allowed'
        }, status=405)
    

@login_required
def friends_list_view(request):
    # Retrieve all active friends for the logged-in user
    friends = Friend.objects.filter(user=request.user, status='friend')
    return render(request, 'friends_list.html', {'friends': friends})

@login_required
def add_friend(request, friend_id):
    friend = get_object_or_404(User, id=friend_id)
    relation, created = Friend.objects.get_or_create(user=request.user, friend=friend, defaults={'status': 'requested'})
    if not created and relation.status == 'blocked':
        return JsonResponse({'error': 'This user is blocked'}, status=400)
    return JsonResponse({'message': 'Friend request sent'})

@login_required
def unfriend(request, friend_id):
    friend = get_object_or_404(User, id=friend_id)
    relation = Friend.objects.filter(user=request.user, friend=friend, status='friend').first()
    if relation:
        relation.delete()
        return JsonResponse({'message': 'Unfriended successfully'})
    return JsonResponse({'error': 'No active friendship found'}, status=400)

@login_required
def block_user(request, friend_id):
    friend = get_object_or_404(User, id=friend_id)
    relation, created = Friend.objects.get_or_create(user=request.user, friend=friend, defaults={'status': 'blocked'})
    if not created:
        relation.status = 'blocked'
        relation.save()
    return JsonResponse({'message': 'User blocked successfully'})

@login_required
def unblock_user(request, friend_id):
    friend = get_object_or_404(User, id=friend_id)
    relation = Friend.objects.filter(user=request.user, friend=friend, status='blocked').first()
    if relation:
        relation.delete()
        return JsonResponse({'message': 'User unblocked successfully'})
    return JsonResponse({'error': 'User is not blocked'}, status=400)