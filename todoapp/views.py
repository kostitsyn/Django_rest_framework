from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import Project, ToDo
from .serializers import ProjectSerializer, ToDoSerializer
from rest_framework.views import APIView


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
