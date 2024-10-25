from django.urls import path
from .views import create_study_session

urlpatterns = [
    path('timer/', create_study_session, name='timer-page'),  
]
