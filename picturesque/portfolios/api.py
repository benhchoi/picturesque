from .models import Portfolio, Artwork
from rest_framework import viewsets, permissions
from .serializers import (PortfolioSerializer, PortfolioReadSerializer,
                          ArtworkSerializer)


# artwork viewset
class ArtworkViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        return self.request.user.artworks.all()


# portfolio viewset
class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PortfolioReadSerializer

        return PortfolioSerializer

    def get_queryset(self):
        queryset = Portfolio.objects.all()
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset


# my portfolios view set
class MyPortfoliosViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = PortfolioReadSerializer

    def get_queryset(self):
        queryset = self.request.user.portfolios.all()
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
