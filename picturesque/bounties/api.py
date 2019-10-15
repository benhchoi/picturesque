from .models import Bounty
from rest_framework import viewsets, permissions
from .serializers import BountySerializer


# bounty viewset
class BountyViewSet(viewsets.ModelViewSet):
    queryset = Bounty.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BountySerializer
