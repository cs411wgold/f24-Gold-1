# models.py in taskboard app
from django.db import models

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.title