from django.db import models
from django.conf import settings
from annoying.fields import AutoOneToOneField
from bounties.models import Bounty
from portfolios.models import Portfolio


class Favorites(models.Model):
    user = AutoOneToOneField(settings.AUTH_USER_MODEL,
                             related_name="favorites",
                             on_delete=models.CASCADE)
    bounties = models.ManyToManyField(Bounty)
    portfolios = models.ManyToManyField(Portfolio)
