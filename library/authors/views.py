from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet, ViewSet
from rest_framework import mixins
from .models import Author, Biography, Book, Article
from .serializers import AuthorSerializer, BiographySerializer, \
    BookSerializer, ArticleSerializer, BookSerializerBase, \
    AuthorSerializerBase, AuthorSerializerFullName
from rest_framework import permissions
from .permissions import StaffOnly
from rest_framework import permissions
from rest_framework import status


class AuthorModelViewSet(
                         mixins.ListModelMixin,
                         GenericViewSet):
    """Viewset for Authors"""
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Author.objects.all()

    def get_serializer_class(self):
        """Choice serializer class depending of the version."""
        # print(self.request.version)
        if self.request.version == '0.1':
            return AuthorSerializerBase
        elif self.request.version == '0.2':
            return AuthorSerializerFullName
        return AuthorSerializer


class BiographyModelViewSet(ModelViewSet):
    # permission_classes = [IsAdminUser]
    queryset = Biography.objects.all()
    serializer_class = BiographySerializer


# class BookModelViewSet(ModelViewSet):
#     # permission_classes = [permissions.IsAuthenticated]
#     queryset = Book.objects.all()
#
#     def get_serializer_class(self):
#         if self.request.method in ['GET']:
#             return BookSerializer
#         return BookSerializerBase

class BookModelViewSet(ViewSet):
    permission_classes = [permissions.AllowAny]
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


    def list(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)

    def create(self, request, format=None):
        new_book = Book.objects.create(name=request.data['name'])
        for author_uuid in request.data['authors']:
            author = Author.objects.get(pk=author_uuid)
            new_book.authors.add(author)
            new_book.save()
        serializer = BookSerializer(new_book)

        return Response(serializer.data)

    def destroy(self, request, pk=None):
        book = Book.objects.get(pk=pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ArticleModelViewSet(ModelViewSet):
    # permission_classes = [StaffOnly]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
