from django.db import models
from django.conf import settings
from annoying.fields import AutoOneToOneField


# class Favorites(models.Model):
#     user = AutoOneToOneField(settings.AUTH_USER_MODEL,
#                              related_name="favorites",
#                              on_delete=models.CASCADE)
#     bounties = models.ManyToManyField()
#     favorites = models.ManyToManyField()
