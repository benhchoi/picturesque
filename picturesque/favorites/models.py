from django.db import models
from django.conf import settings
from annoying.fields import AutoOneToOneField
from bounties.models import Bounty
from portfolios.models import Portfolio
from django.contrib.auth.models import User


class Favorites(models.Model):
    user = AutoOneToOneField(User,
                             primary_key=True,
                             related_name="favorites",
                             on_delete=models.CASCADE)
    bounties = models.ManyToManyField(Bounty, blank=True)
    portfolios = models.ManyToManyField(Portfolio, blank=True)
