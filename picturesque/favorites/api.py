from .models import Favorites
from rest_framework import viewsets, permissions
from .serializers import FavoritesSerializer, FavoritesReadSerializer


class FavoritesViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return FavoritesReadSerializer

        return FavoritesSerializer

    def get_queryset(self):
        queryset = Favorites.objects.filter(user=self.request.user)
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
