from django.db import models

class Assignment(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    course_id = models.IntegerField()
    due_at = models.DateTimeField(blank=True, null=True)
    points_possible = models.FloatField(blank=True, null=True)
    grading_type = models.CharField(max_length=50)
    submission_types = models.CharField(max_length=50)

    def __str__(self):
        return self.name
