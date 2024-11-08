# /backend/courses/views.py
from django.http import JsonResponse
from django.views import View
from .models import Course

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
