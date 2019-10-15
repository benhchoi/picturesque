from django.db import models
from django.conf import settings
from taggit.managers import TaggableManager


def find_path(instance, filename):
    return f'u/{instance.user.username}/{filename}'


class Artwork(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    image = models.ImageField(upload_to=find_path)
    price = models.PositiveSmallIntegerField(null=True, blank=True)
    description = models.CharField(max_length=200)


class Portfolio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    tags = TaggableManager()
    rate = models.PositiveSmallIntegerField()
    artworks = models.ManyToManyField(Artwork)
