# /backend/courses/models.py
from django.db import models

class Course(models.Model):
    course_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=255)
    started_at = models.DateTimeField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name
    
class RegisteredCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='registered_courses')

    def __str__(self):
        return f"Registered: {self.course.name}"
