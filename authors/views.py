from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Author, Biography, Book, Article
from .serializers import AuthorSerializer, BiographySerializer, BookSerializer, ArticleSerializer, BookSerializerBase
from rest_framework import permissions
from .permissions import StaffOnly
from rest_framework import permissions


class AuthorModelViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class BiographyModelViewSet(ModelViewSet):
    # permission_classes = [IsAdminUser]
    queryset = Biography.objects.all()
    serializer_class = BiographySerializer


class BookModelViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Book.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return BookSerializer
        return BookSerializerBase


class ArticleModelViewSet(ModelViewSet):
    # permission_classes = [StaffOnly]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
