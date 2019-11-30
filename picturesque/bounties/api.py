from .models import Bounty, ReferenceArt
from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from .serializers import BountySerializer, ReferenceArtSerializer
from django.contrib.auth.models import User


# reference art viewset
class ReferenceArtViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ReferenceArtSerializer

    def get_queryset(self):
        return self.request.user.reference_arts.all()


# bounty viewset
class BountyViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = BountySerializer

    def get_queryset(self):
        queryset = Bounty.objects.all()
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset


# my bounties view set
class MyBountiesViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BountySerializer

    def get_queryset(self):
        queryset = User.objects.get_by_natural_key(
            self.request.query_params['username']).bounties.all()
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
