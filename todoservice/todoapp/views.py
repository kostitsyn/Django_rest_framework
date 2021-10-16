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
        for user_id in request.data['users']:
            try:
                current_user = User.objects.get(pk=user_id)
            except User.DoesNotExist:
                current_user = None
            new_project.users.add(current_user)
            new_project.save()
        return Response(status=status.HTTP_201_CREATED)

# class ExamplePagination(PageNumberPagination):
#     page_size = 2
#
# class ProjectModelViewSet(ViewSet):
#     # permission_classes = [IsAdminUser]
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#
#     def list(self, request):
#         projects = Project.objects.all()
#         serializer = ProjectSerializer(projects, many=True)
#         return Response(serializer.data)

    # def get_serializer_class(self):
    #     if self.request.method in ['GET']:
    #         return ProjectSerializer
    #     return ProjectSerializerBase

    # def create(self, request, *args, **kwargs):
    #     print()


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


# class ToDoViewSet(ViewSet):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#
#     def list(self, request):
#         notes = ToDo.objects.all()
#         serializer = ToDoSerializer(notes, many=True)
#         return Response(serializer.data)
#     #
#     def retrieve(self, request, pk=None):
#         note = get_object_or_404(ToDo, pk=pk)
#         serializer = ToDoSerializer(note)
#         return Response(serializer.data)
#     #
#     # def create(self, request):
#     #     print()
#     #     pass
#     #
#     # def update(self, request, pk=None):
#     #     note = get_object_or_404(ToDo, pk=pk)
#     #     print()
#     #     pass
#
#     def destroy(self, request, pk=None):
#         note = get_object_or_404(ToDo, pk=pk)
#         note.is_active = False
#         note.save()
#         serializer = ToDoSerializer(note)
#         return Response(serializer.data)


# class NoteCreateAPIView(generics.CreateAPIView):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoSerializer
#
#
# class NoteListAPIView(generics.ListAPIView):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoSerializer
#     pagination_class = ToDoLimitOffsetPagination
#     filterset_class = TodoFilter
#
#     def get_queryset(self):
#         return ToDo.objects.filter(is_active=True)
#
#
# class NoteRetrieveAPIView(generics.RetrieveAPIView):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoSerializer
#
#
# class NoteUpdateAPIView(generics.UpdateAPIView):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoSerializer
#
#
# class NoteDestroyAPIView(generics.DestroyAPIView):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoSerializer
#
#     def destroy(self, request, *args, **kwargs):
#         instance = self.get_object()
#         instance.is_active = False
#         instance.save()
#         return Response()


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

    def get_queryset(self):
        return ToDo.objects.filter(is_active=True)
