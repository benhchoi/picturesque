from .models import Favorites
from rest_framework import viewsets, generics, permissions, mixins
from .serializers import FavoritesSerializer
from django.contrib.auth.models import User


class FavoritesViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = FavoritesSerializer

    def get_queryset(self):
        queryset = Favorites.objects.all()
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset


class UsernameFavoritesAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FavoritesSerializer

    def get_object(self):
        return User.objects.get_by_natural_key(
            self.request.query_params['username']).favorites
