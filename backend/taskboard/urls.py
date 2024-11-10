# Add this view to your urls.py
from django.urls import path
from .views import TaskView, SelectedTaskView
from . import views

urlpatterns = [
    path('task/<int:task_id>/', TaskView.as_view(), name='task_detail'),
    path('task/', TaskView.as_view(), name='task_list'),
    path('tags/', views.add_tag, name='add_tag'),          # To add tags (POST)
    path('tags/<int:tag_id>/', views.delete_tag, name='delete_tag'),  # To delete tags (DELETE)
    path('tags/list/', views.list_tags, name='list_tags'), # To list tags (GET)
    path('selected_task/', SelectedTaskView.as_view(), name='selected_task_list'),
    path('selected_task/<int:task_id>/', SelectedTaskView.as_view(), name='selected_task_detail'),
]
