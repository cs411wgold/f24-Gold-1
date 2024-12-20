from django.db import models
from django.contrib.auth.models import User

# https://www.geeksforgeeks.org/django-model-data-types-and-fields-list/#
# https://docs.djangoproject.com/en/5.1/topics/db/models/
# https://docs.djangoproject.com/en/5.1/ref/contrib/postgres/fields/#arrayfield

# docker compose build backend
# docker-compose up -d

# Connect user stuff later
# user = models.ForeignKey(User, on_delete=models.CASCADE)  

class StudySession(models.Model):
    task_name = models.CharField(max_length=255)
    task_time = models.IntegerField()
    date_started = models.DateTimeField()