from django.urls import path
from .views import hello_world, homepage, login_view, signup_view, change_password_view, friends_list_view, add_friend, unblock_user, block_user, unfriend #, list_upcoming_assignments_view

urlpatterns = [
    path('hello/', hello_world, name='hello page'),
    path('', homepage, name='landing page yuhhh'),
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('change-password/', change_password_view, name='change-password'),
    path('friends/', friends_list_view, name='friendList'),
    path('add_friend/<int:friend_id>/', add_friend, name='add_friend'),
    path('unfriend/<int:friend_id>/', unfriend, name='unfriend'),
    path('block_user/<int:friend_id>/', block_user, name='block_user'),
    path('unblock_user/<int:friend_id>/', unblock_user, name='unblock_user'),
  #  path('api/courses/<int:course_id>/assignments/', list_upcoming_assignments_view, name='list_upcoming_assignments'),
]