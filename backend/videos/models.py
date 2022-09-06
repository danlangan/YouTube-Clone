from django.db import models
from authentication.models import User

# Create your models here.

class Video(models.Model):
    video_id = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=300)
    release_date = models.DateField()
    video_likes = models.IntegerField()
    video_dislikes = models.IntegerField()