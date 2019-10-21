from rest_framework import serializers
from .models import Bounty, ReferenceArt
from accounts.serializers import UserSerializer
from taggit_serializer.serializers import (
    TagListSerializerField, TaggitSerializer)


class ReferenceArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferenceArt
        fields = '__all__'


class BountySerializer(TaggitSerializer, serializers.ModelSerializer):
    user = UserSerializer()
    tags = TagListSerializerField()
    reference_arts = ReferenceArtSerializer(many=True)

    class Meta:
        model = Bounty
        fields = '__all__'

    @staticmethod
    def setup_eager_loading(queryset):
        """ Perform necessary eager loading of data. """
        queryset = queryset.select_related('user')
        queryset = queryset.prefetch_related('tags', 'reference_arts')
        return queryset
