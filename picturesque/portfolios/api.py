from .models import Portfolio, Artwork
from rest_framework import viewsets, permissions, mixins, filters
from .serializers import PortfolioSerializer, ArtworkSerializer
from django.contrib.auth.models import User


# artwork viewset
class ArtworkViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        return self.request.user.artworks.all().order_by('-id')


# portfolio viewset
class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = PortfolioSerializer
    filter_backends = [
        filters.SearchFilter
    ]
    search_fields = [
        'user__username',
        'title',
        'tags__name'
    ]

    def get_queryset(self):
        queryset = Portfolio.objects.all().order_by('-timestamp')
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset


# my portfolios view set
class MyPortfoliosViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PortfolioSerializer

    def get_queryset(self):
        queryset = User\
            .objects.get_by_natural_key(self.request.query_params['username'])\
            .portfolios.all().order_by('-timestamp')
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
