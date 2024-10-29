from django.urls import path
from .views import hello_world, homepage, login_view, signup_view #, list_upcoming_assignments_view

urlpatterns = [
    path('hello/', hello_world, name='hello page'),
    path('', homepage, name='landing page yuhhh'),
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
  #  path('api/courses/<int:course_id>/assignments/', list_upcoming_assignments_view, name='list_upcoming_assignments'),
]