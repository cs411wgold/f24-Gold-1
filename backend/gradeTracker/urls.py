from django.urls import path
from .views import CourseAssignmentsView

urlpatterns = [
    path('courses-assignments/', CourseAssignmentsView.as_view(), name='courses_assignments'),
]
