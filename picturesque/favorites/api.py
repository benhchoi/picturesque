from .models import Favorites
from rest_framework import viewsets, permissions
from .serializers import FavoritesSerializer


class FavoritesViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = FavoritesSerializer

    def get_queryset(self):
        queryset = Favorites.objects.filter(user=self.request.user)
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
