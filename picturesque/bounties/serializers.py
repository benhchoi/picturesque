from rest_framework import serializers
from .models import Bounty, ReferenceArt
from accounts.serializers import UserSerializer
from taggit_serializer.serializers import (
    TagListSerializerField, TaggitSerializer)


class ReferenceArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferenceArt
        fields = '__all__'


class BountyReadSerializer(TaggitSerializer, serializers.ModelSerializer):
    user = UserSerializer()
    tags = TagListSerializerField()
    reference_arts = ReferenceArtSerializer(many=True)

    class Meta:
        model = Bounty
        fields = '__all__'

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('user')
        queryset = queryset.prefetch_related('tags', 'reference_arts')
        return queryset


class BountySerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Bounty
        fields = '__all__'

    def to_representation(self, instance):
        serializer = BountyReadSerializer(instance)
        return serializer.data

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('user')
        queryset = queryset.prefetch_related('tags', 'reference_arts')
        return queryset
