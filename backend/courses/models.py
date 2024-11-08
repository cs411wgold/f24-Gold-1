# /backend/courses/models.py
from django.db import models

class Course(models.Model):
    course_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=255)
    started_at = models.DateTimeField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name
