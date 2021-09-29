from rest_framework.serializers import ModelSerializer
from .models import User


class UserModelSerializerBase(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'firstname',
            'lastname',
            'email',
            'uuid',
        ]
