from rest_framework import routers
from .api import PortfolioViewSet, ArtworkViewSet, MyPortfoliosViewSet

router = routers.DefaultRouter()
router.register('api/portfolios', PortfolioViewSet, 'portfolios')
router.register('api/artworks', ArtworkViewSet, 'artworks')
router.register('api/myportfolios', MyPortfoliosViewSet, 'myportfolios')

urlpatterns = router.urls
