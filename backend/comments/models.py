from cgi import print_exception
from unicodedata import decimal
from django.db import models
from authentication.models import User

# Create your models here.

class Comment(models.Model):
    text = models.CharField(max_length=255)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    video_id = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)