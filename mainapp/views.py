from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import User, Article
from rest_framework.response import Response
from .serializer import ArticleSerializer, UserSerializer
from rest_framework.decorators import api_view, renderer_classes

from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from rest_framework import viewsets

from rest_framework.decorators import action

from rest_framework import mixins

from .filters import ArticleFilter

from rest_framework.pagination import LimitOffsetPagination


class ArticleApiView(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request, format='None'):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def user_view(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


class UserCreateView(CreateAPIView):
    renderer_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ArticleCreateView(CreateAPIView):
    renderer_classes = [JSONRenderer]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class UserRetrieveAPIView(RetrieveAPIView):
    renderer_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ArticleRetrieveAPIView(RetrieveAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleFilterListAPIView(ListAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset(self):
        value = self.kwargs['name']
        return Article.objects.exclude(name=value)


class ArticleListAPIView(ListAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class UserListAPIView(ListAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        value = self.request.query_params.get('name', '')
        users = User.objects.all()
        if value:
            users = users.filter(lastname__startswith=value)
        return users


class ArticleDestroyAPIView(DestroyAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class UserDestroyAPIView(DestroyAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ArticleUpdateAPIView(UpdateAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleViewSet(viewsets.ViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def list(self, queryset):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        article = get_object_or_404(Article, pk=pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)


class UserViewSet(viewsets.ViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    @action(detail=True, methods=['get'])
    def user_email_only(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        return Response({'user.email': user.email})

    @action(detail=False, methods=['get'])
    def users_username_only(self, request):
        users = User.objects.all()
        spam = {f'{user.firstname} {user.lastname}': user.username for user in users}
        return Response(spam)


class ArticleCustomViewSet(mixins.DestroyModelMixin,
                           mixins.ListModelMixin,
                           mixins.UpdateModelMixin,
                           viewsets.GenericViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


class ArticleDjangoFilterViewSet(viewsets.ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # filterset_fields = ['name', 'text']
    filterset_class = ArticleFilter


class ArticleLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 5


class ArticleLimitOffsetPaginationViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = ArticleLimitOffsetPagination