"""todoservice URL Configuration

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
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from usersapp.views import UserModelViewSet
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from graphene_django.views import GraphQLView


schema_view = get_schema_view(
    openapi.Info(
        title='ToDo Project',
        default_version='0.1',
        description='Documentation to my project',
        contact=openapi.Contact(url='https://www.geek-shop.xyz'),
        license=openapi.License(name='GNU License'),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)
)

router = DefaultRouter()

router.register('projects', ProjectModelViewSet, basename='projects')
router.register('notes', ToDoModelViewSet, basename='notes')
router.register('users', UserModelViewSet, basename='users')

router_1 = DefaultRouter()
router_1.register('users', UserModelViewSet)


router_1 = DefaultRouter()
router_1.register('users', UserModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api/<version>/', include(router_1.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/notes/', NoteListAPIView.as_view()),
    # path('api/notes/<str:pk>/', NoteRetrieveAPIView.as_view()),
    # path('api/notes/create/', NoteCreateAPIView.as_view()),
    # path('api/notes/update/<str:pk>/', NoteUpdateAPIView.as_view()),
    # path('api/notes/destroy/<str:pk>/', NoteDestroyAPIView.as_view()),
    # path('api/users/0.1', include('usersapp.urls', namespace='0.1')),
    # path('api/users/0.2', include('usersapp.urls', namespace='0.2')),
    # path('api/users/0.3', include('usersapp.urls', namespace='0.3')),

    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc-old/', schema_view.with_ui('redoc-old', cache_timeout=0), name='schema-redoc'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('graphql/', GraphQLView.as_view(graphiql=True))
]



