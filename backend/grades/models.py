# models.py in the /backend/grades directory

from django.db import models
from assignments.models import Assignment  # Import Assignment model from the assignments app

class Grade(models.Model):
    # ForeignKey to the Assignment model in the assignments app
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    grade = models.FloatField()

    def __str__(self):
        return f"Assignment: {self.assignment.name} - Grade: {self.grade}"

