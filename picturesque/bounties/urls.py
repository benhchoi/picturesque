from rest_framework import routers
from .api import BountyViewSet

router = routers.DefaultRouter()
router.register('api/bounties', BountyViewSet, 'bounties')

urlpatterns = router.urls
