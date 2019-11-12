from rest_framework import routers
from .api import FavoritesViewSet


router = routers.DefaultRouter()
router.register('api/favorites', FavoritesViewSet, 'favorites')

urlpatterns = router.urls
