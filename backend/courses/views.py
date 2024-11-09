# /backend/courses/views.py
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Course, RegisteredCourse
import json

class CourseListView(View):
    def get(self, request):
        courses = Course.objects.all()
        course_data = [
            {
                "course_id": course.course_id,
                "name": course.name,
                "started_at": course.started_at,
                "ended_at": course.ended_at,
            }
            for course in courses
        ]
        return JsonResponse({"courses": course_data}, safe=False)

# View for registering a course
@method_decorator(csrf_exempt, name='dispatch')
class RegisterCourseView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            course_id = data.get("course_id")

            if not course_id:
                return JsonResponse({"error": "Course ID is required."}, status=400)

            # Fetch the course from the Course model
            course = Course.objects.get(course_id=course_id)
            # Create a new registered course entry
            registered_course = RegisteredCourse.objects.create(
                course=course
            )
            return JsonResponse({
                "course_id": registered_course.course.course_id,
                "name": registered_course.course.name,
                "started_at": registered_course.course.started_at,
                "ended_at": registered_course.course.ended_at,
            }, status=201)
        except Course.DoesNotExist:
            return JsonResponse({"error": "Course not found."}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data."}, status=400)
    
    def delete(self, request, course_id):
        try:
            # Fetch the registered course from the RegisteredCourse model
            registered_course = RegisteredCourse.objects.get(course__course_id=course_id)
            registered_course.delete()
            return JsonResponse({"message": "Registered course deleted successfully."}, status=200)
        except RegisteredCourse.DoesNotExist:
            return JsonResponse({"error": "Registered course not found."}, status=404)

# View to list all registered courses
class RegisteredCoursesView(View):
    def get(self, request):
        registered_courses = RegisteredCourse.objects.all()
        registered_course_data = [
            {
                "course_id": registered_course.course.course_id,
                "name": registered_course.course.name,
            }
            for registered_course in registered_courses
        ]
        return JsonResponse(registered_course_data, safe=False)
    
    def delete(self, request, course_id):
        try:
            # Fetch the registered course from the RegisteredCourse model
            registered_course = RegisteredCourse.objects.get(course__course_id=course_id)
            registered_course.delete()
            return JsonResponse({"message": "Registered course deleted successfully."}, status=200)
        except RegisteredCourse.DoesNotExist:
            return JsonResponse({"error": "Registered course not found."}, status=404)


# View to delete a registered course by its course ID
@method_decorator(csrf_exempt, name='dispatch')
class DeleteRegisteredCourseView(View):
    def delete(self, request, course_id):
        try:
            # Fetch the registered course from the RegisteredCourse model
            registered_course = RegisteredCourse.objects.get(course__course_id=course_id)
            registered_course.delete()
            return JsonResponse({"message": "Registered course deleted successfully."}, status=200)
        except RegisteredCourse.DoesNotExist:
            return JsonResponse({"error": "Registered course not found."}, status=404)
        

