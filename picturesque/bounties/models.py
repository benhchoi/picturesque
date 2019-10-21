from django.db import models
from django.conf import settings
from taggit.managers import TaggableManager


def find_path(instance, filename):
    return f'u/{instance.user.username}/refart/{filename}'


class ReferenceArt(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name="reference_arts",
                             on_delete=models.CASCADE)
    image = models.ImageField(upload_to=find_path)
    description = models.CharField(max_length=200)


class Bounty(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name="bounties",
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    tags = TaggableManager()
    price = models.PositiveSmallIntegerField()
    reference_arts = models.ManyToManyField(ReferenceArt)
