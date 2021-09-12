from rest_framework import serializers
from .models import Article, User


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = '__all__'

    def to_representation(self, instance):
        # self.fields['user'] = UserSerializer(read_only=True)
        self.fields['user'] = serializers.StringRelatedField()
        return super(ArticleSerializer, self).to_representation(instance)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
