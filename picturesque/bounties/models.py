from django.db import models
from django.conf import settings
from taggit.managers import TaggableManager


def find_path(instance, filename):
    return f'u/{instance.user.username}/{filename}'


class ReferenceArt(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    image = models.ImageField(upload_to=find_path)


class Bounty(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    tags = TaggableManager()
    price = models.PositiveSmallIntegerField()
    reference_arts = models.ManyToManyField(ReferenceArt, through='BountyArt')


class BountyArt(models.Model):
    bounty = models.ForeignKey(Bounty, on_delete=models.CASCADE)
    reference_art = models.ForeignKey(ReferenceArt, on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
