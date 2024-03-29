from django.db import models
from django.conf import settings
from taggit.managers import TaggableManager


def find_path(instance, filename):
    return f'u/{instance.user.username}/artwork/{filename}'


class Artwork(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name="artworks",
                             on_delete=models.CASCADE)
    image = models.ImageField(upload_to=find_path)
    price = models.PositiveIntegerField(null=True, blank=True)
    description = models.CharField(max_length=200)


class Portfolio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name="portfolios",
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    tags = TaggableManager()
    rate = models.PositiveIntegerField()
    artworks = models.ManyToManyField(Artwork)
