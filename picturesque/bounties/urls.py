from rest_framework import routers
from .api import BountyViewSet, ReferenceArtViewSet, MyBountiesViewSet

router = routers.DefaultRouter()
router.register('api/bounties', BountyViewSet, 'bounties')
router.register('api/refarts', ReferenceArtViewSet, 'refarts')
router.register('api/mybounties', MyBountiesViewSet, 'mybounties')

urlpatterns = router.urls
