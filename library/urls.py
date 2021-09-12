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
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from mainapp import views


router = DefaultRouter()
router.register('article_set', views.ArticleViewSet, basename='article')
router.register('user_set', views.UserViewSet, basename='user')
router.register('article_mix', views.ArticleCustomViewSet, basename='article_mix'),
router.register('django-filter', views.ArticleDjangoFilterViewSet, basename='django-filter')
router.register('limit-offset-pagination', views.ArticleLimitOffsetPaginationViewSet, basename='limit-offset-pagination')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('views/api-view/', views.ArticleApiView.as_view()),
    path('views/user-api/', views.user_view),
    path('views/user-create/', views.UserCreateView.as_view()),
    path('views/article-create/', views.ArticleCreateView.as_view()),
    path('views/user/<str:pk>/', views.UserRetrieveAPIView.as_view()),
    path('views/article/<str:pk>/', views.ArticleRetrieveAPIView.as_view()),
    path('views/articles/<str:name>/', views.ArticleFilterListAPIView.as_view()),
    path('views/articles/', views.ArticleListAPIView.as_view()),
    path('views/users/', views.UserListAPIView.as_view()),
    path('views/article/delete/<str:pk>/', views.ArticleDestroyAPIView.as_view()),
    path('views/user/delete/<str:pk>/', views.UserDestroyAPIView.as_view()),
    path('views/article/update/<str:pk>/', views.ArticleUpdateAPIView.as_view()),
    path('viewsets/', include(router.urls)),
]
