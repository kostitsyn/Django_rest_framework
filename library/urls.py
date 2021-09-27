"""library URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from authors.views import AuthorModelViewSet, BiographyModelViewSet, BookModelViewSet, ArticleModelViewSet
from rest_framework.authtoken import views
from userapp.views import UserListAPIView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from graphene_django.views import GraphQLView

schema_view = get_schema_view(
    openapi.Info(
        title='Library',
        default_version='0.1',
        description='Documentation to out project',
        contact=openapi.Contact(email='admin@admin.local'),
        license=openapi.License(name='MIT License')
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)
)

router = DefaultRouter()
router.register('authors', AuthorModelViewSet)
router.register('biographies', BiographyModelViewSet)
router.register('books', BookModelViewSet)
router.register('articles', ArticleModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/<version>/users/', UserListAPIView.as_view()),
    # re_path(r'^api/(?P<version>\d\.\d)/users/$', UserListAPIView.as_view()),
    # path('api/users/0.1', include('userapp.urls', namespace='0.1')),
    # path('api/users/0.2', include('userapp.urls', namespace='0.2')),
    # path('api/users/0.3', include('userapp.urls', namespace='0.3')),

    path('swagger<format>', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
