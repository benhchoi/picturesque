from rest_framework import routers
from .api import PortfolioViewSet, ArtworkViewSet

router = routers.DefaultRouter()
router.register('api/portfolios', PortfolioViewSet, 'portfolios')
router.register('api/artworks', ArtworkViewSet, 'artworks')

urlpatterns = router.urls
