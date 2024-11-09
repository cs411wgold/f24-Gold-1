# /backend/courses/urls.py
from django.urls import path
from .views import CourseListView, RegisterCourseView, RegisteredCoursesView, DeleteRegisteredCourseView

urlpatterns = [
    # Endpoint to get the list of available courses
    path('list/', CourseListView.as_view(), name='course_list'),

    # Endpoint to register a course
    path('register/', RegisterCourseView.as_view(), name='register_course'),

    # Endpoint to get all registered courses
    path('registered/', RegisteredCoursesView.as_view(), name='registered_courses'),

    # Endpoint to delete a registered course by its ID
    path('register/<int:course_id>/', DeleteRegisteredCourseView.as_view(), name='delete_registered_course'),
]
