from rest_framework import routers
from .api import BountyViewSet, ReferenceArtViewSet

router = routers.DefaultRouter()
router.register('api/bounties', BountyViewSet, 'bounties')
router.register('api/refarts', ReferenceArtViewSet, 'refarts')

urlpatterns = router.urls
