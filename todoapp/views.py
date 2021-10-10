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
        return Response(status=status.HTTP_201_CREATED)

    def partial_update(self, request, pk=None):
        try:
            update_project = Project.objects.get(pk=pk)
            users_project = []
            if request.data['users']:
                for user in request.data['users']:
                    current_user = User.objects.get(pk=user['uuid'])
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
            pass
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

    def create(self, request, *args, **kwargs):
        try:
            note_project = Project.objects.get(pk=request.data['project'])
        except Project.DoesNotExist:
            note_project = Project.objects.all()[0]
        try:
            note_user = User.objects.get(pk=request.data['user'])
        except User.DoesNotExist:
            note_user = User.objects.all()[0]
        ToDo.objects.create(project=note_project, text=request.data['text'], user=note_user)
        return Response(status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return ToDo.objects.filter(is_active=True)
