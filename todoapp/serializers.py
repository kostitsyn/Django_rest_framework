from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Project, ToDo
from usersapp.serializers import UserModelSerializer


class ProjectSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(ModelSerializer):
    project = StringRelatedField()
    user = StringRelatedField()

    class Meta:
        model = ToDo
        fields = ['project', 'text', 'user', 'is_active']
