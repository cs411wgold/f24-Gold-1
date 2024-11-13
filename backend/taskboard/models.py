# models.py in taskboard app
from django.db import models

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.title
    

class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=20)  # For storing the color of the tag
    task = models.ForeignKey(Task, related_name='tags', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} (Task: {self.task.title})"
    
class SelectedTask(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='selected_task')
    is_selected = models.BooleanField(default=True)