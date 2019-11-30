from django.urls import path, include
from rest_framework import routers
from .api import FavoritesViewSet, UsernameFavoritesAPI


router = routers.DefaultRouter()
router.register('api/favorites', FavoritesViewSet, 'favorites')

urlpatterns = router.urls + [
    path('api/usernamefavorites', UsernameFavoritesAPI.as_view())
]
