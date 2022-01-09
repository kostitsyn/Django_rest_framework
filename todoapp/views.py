from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import Project, ToDo
from usersapp.models import User
from .serializers import ProjectSerializer, ProjectSerializerBase, ToDoSerializer, ToDoSerializerBase
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from .filters import ProjectFilter, TodoFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import permissions
from rest_framework import status


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    # permission_classes = [IsAdminUser]
    queryset = Project.objects.all()
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectSerializer
        return ProjectSerializerBase

    def create(self, request, *args, **kwargs):
        new_project = Project.objects.create(name=request.data['name'], repo_link=request.data['repo_link'])
        for user_uuid in request.data['users']:
            try:
                current_user = User.objects.get(uuid=user_uuid)
            except User.DoesNotExist:
                current_user = None
            new_project.users.add(current_user)
            new_project.save()
        serializer = self.get_serializer_class()(new_project)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        try:
            update_project = Project.objects.get(pk=pk)
            users_project = []
            if request.data['users']:
                for user in request.data['users']:
                    current_user = User.objects.get(pk=user)
                    users_project.append(current_user)
            if update_project.users != users_project:
                update_project.users.set(users_project)
                update_project.save()
            if update_project.name != request.data['name']:
                update_project.name = request.data['name']
                update_project.save()
            if update_project.repo_link != request.data['repo_link']:
                update_project.repo_link = request.data['repo_link']
                update_project.save()
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = self.get_serializer_class()(update_project)
            return Response(serializer.data)


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ToDo.objects.all()
    # pagination_class = ToDoLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoSerializer
        return ToDoSerializerBase

    @action(detail=True, methods=['delete'])
    def delete_note(self, request, pk=None):
        note = get_object_or_404(ToDo, pk=pk)
        note.is_active = False
        note.save()
        serializer = ToDoSerializer(note)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        try:
            note_project = Project.objects.get(pk=request.data['project'])
        except Project.DoesNotExist:
            note_project = Project.objects.all()[0]
        try:
            note_user = User.objects.get(pk=request.data['user'])
        except User.DoesNotExist:
            note_user = User.objects.all()[0]
        new_object = ToDo.objects.create(project=note_project, text=request.data['text'], user=note_user)
        serializer = self.get_serializer_class()(new_object)
        return Response(serializer.data)

    def get_queryset(self):
        return ToDo.objects.filter(is_active=True)
