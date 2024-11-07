from django.urls import path
from . import views

urlpatterns = [
    path('task/<int:task_id>/', views.get_task_by_id, name='get_task_by_id'),
    path('tasks/', views.list_tasks, name='list_tasks'),
    path('task/', views.add_task, name='add_task'),
]
