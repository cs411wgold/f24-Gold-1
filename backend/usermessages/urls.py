from django.urls import path
from .views import handle_messages_request

urlpatterns = [
    path('messages/', handle_messages_request, name='messages-page'),  
]
