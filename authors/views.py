from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Author, Biography, Book, Article
from .serializers import AuthorSerializer, BiographySerializer, BookSerializer, ArticleSerializer
from rest_framework.permissions import AllowAny, IsAdminUser
from .permissions import StaffOnly


class AuthorModelViewSet(ModelViewSet):
    # permission_classes = [AllowAny]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class BiographyModelViewSet(ModelViewSet):
    # permission_classes = [IsAdminUser]
    queryset = Biography.objects.all()
    serializer_class = BiographySerializer


class BookModelViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class ArticleModelViewSet(ModelViewSet):
    # permission_classes = [StaffOnly]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
