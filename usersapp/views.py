from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import mixins
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
