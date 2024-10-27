from django.urls import path
from .assignment_views import list_upcoming_assignments

urlpatterns = [path('assignments/upcoming/', list_upcoming_assignments, name='list_upcoming_assignments'),
    
]
