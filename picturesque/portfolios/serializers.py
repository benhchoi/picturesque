from rest_framework import serializers
from .models import Portfolio, Artwork
from accounts.serializers import UserSerializer
from taggit_serializer.serializers import (
    TagListSerializerField, TaggitSerializer)


class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'


class PortfolioReadSerializer(TaggitSerializer, serializers.ModelSerializer):
    user = UserSerializer()
    tags = TagListSerializerField()
    artworks = ArtworkSerializer(many=True)

    class Meta:
        model = Portfolio
        fields = '__all__'

    @staticmethod
    def setup_eager_loading(queryset):
        """ Perform necessary eager loading of data. """
        queryset = queryset.select_related('user')
        queryset = queryset.prefetch_related('tags', 'artworks')
        return queryset


class PortfolioSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Portfolio
        fields = '__all__'

    def to_representation(self, instance):
        serializer = PortfolioReadSerializer(instance)
        return serializer.data

    @staticmethod
    def setup_eager_loading(queryset):
        """ Perform necessary eager loading of data. """
        queryset = queryset.select_related('user')
        queryset = queryset.prefetch_related('tags', 'artworks')
        return queryset
