from django.urls import path
from .views import handle_study_request

urlpatterns = [
    path('timer/', handle_study_request, name='timer-page'),  
]
