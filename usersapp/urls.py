from django.urls import path, include
from .views import UserModelViewSet
from rest_framework.routers import DefaultRouter

app_name = 'usersapp'
router = DefaultRouter()
router.register('', UserModelViewSet)

urlpatterns = [
    path('', include(router.urls))
]
