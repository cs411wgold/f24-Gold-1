# In assignments/assignment_urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('upcoming/', views.list_upcoming_assignments, name='upcoming-assignments'),
    path('list/', views.list_assignments_from_db, name='list_assignments'),
]
