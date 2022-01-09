from rest_framework.serializers import ModelSerializer, HyperlinkedRelatedField, StringRelatedField
from .models import Project, ToDo
from usersapp.serializers import UserModelSerializer


class ProjectSerializerBase(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'



class ProjectSerializer(ModelSerializer):
    # users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'



class ToDoSerializerBase(ModelSerializer):

    class Meta:
        model = ToDo
        fields = ['project', 'text', 'user', 'is_active', 'uuid']


class ToDoSerializer(ModelSerializer):
    # project = HyperlinkedRelatedField(view_name='project-detail', read_only=True)
    # user = HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    project = ProjectSerializer()
    user = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = ['project', 'text', 'user', 'is_active', 'uuid']
