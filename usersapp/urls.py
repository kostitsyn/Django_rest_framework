from django.urls import path, include
from .views import UserModelViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', UserModelViewSet)

app_name = 'usersapp'
urlpatterns = [
    path('', include(router.urls)),
]
