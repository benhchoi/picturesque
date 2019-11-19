from rest_framework import serializers
from .models import Favorites
from accounts.serializers import UserSerializer
from bounties.serializers import BountyReadSerializer
from portfolios.serializers import PortfolioReadSerializer


class FavoritesReadSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    bounties = BountyReadSerializer(many=True)
    portfolios = PortfolioReadSerializer(many=True)

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

    def to_representation(self, instance):
        serializer = FavoritesReadSerializer(instance)
        return serializer.data

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('user')
        queryset = queryset.prefetch_related('bounties', 'portfolios')
        return queryset
