from .models import Bounty, ReferenceArt
from rest_framework import viewsets, permissions
from .serializers import BountySerializer, ReferenceArtSerializer


# reference art viewset
class ReferenceArtViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
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
