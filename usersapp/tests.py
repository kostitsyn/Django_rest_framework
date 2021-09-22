import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from mixer.backend.django import mixer
from django.contrib.auth import models
from .views import UserModelViewSet
from .models import User


class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.admin = models.User.objects.create_superuser(username='django', password='21778821')

    def test_get_user_list(self):
        request = self.factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_un(self):
        user = User.objects.create(username='JD', firstname='John', lastname='Doe', email='doe@john.ru')
        request = self.factory.put(f'/api/users/{user.uuid}/', {'firstname': 'Igor',
                                                                    'lastname': 'Borisovich'})
        view = UserModelViewSet.as_view({'put': 'update'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_update_user(self):
    #     user = User.objects.create(username='JD', firstname='John', lastname='Doe', email='doe@john.ru')
    #     request = self.factory.put(f'/api/users/{user.uuid}/', {'firstname': 'Igor',
    #                                                                 'lastname': 'Borisovich'})
    #     force_authenticate(request, self.admin)
    #     view = UserModelViewSet.as_view({'put': 'update'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_current_user(self):
        user = User.objects.create(username='JD', firstname='John', lastname='Doe', email='doe@john.ru')
        request = self.factory.get(f'/api/users/{user.uuid}/')
        view = UserModelViewSet.as_view({'get': 'retrieve'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
