from rest_framework.serializers import ModelSerializer, StringRelatedField, HyperlinkedRelatedField
from .models import Project, ToDo
from usersapp.serializers import UserModelSerializer


class ProjectSerializer(ModelSerializer):
    # users = UserModelSerializer(many=True)
    # users = HyperlinkedRelatedField(many=True, view_name='user-detail', read_only=True)
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(ModelSerializer):
    # project = StringRelatedField()
    # project = ProjectSerializer()
    project = HyperlinkedRelatedField(view_name='project-detail', read_only=True)
    user = StringRelatedField()

    class Meta:
        model = ToDo
        fields = ['project', 'text', 'user', 'is_active']
