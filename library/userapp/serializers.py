from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


class UserSerializerWithFullName(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class UserSerializersWithAdmin(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'is_superuser')


