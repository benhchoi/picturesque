from rest_framework import serializers
from .models import Favorites
from accounts.serializers import UserSerializer
from bounties.serializer import BountyReadSerializer
from portfolios.serializer import PortfolioReadSerializer


class FavoritesReadSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    bounties = BountyReadSerializer()
    portfolios = PortfolioReadSerializer()

    class Meta:
        model = Favorites
        fields = '__all__'

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('user')
        queryset = queryset.prefetch_related('bounties', 'portfolios')
        return queryset


class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('user')
        queryset = queryset.prefetch_related('bounties', 'portfolios')
        return queryset
