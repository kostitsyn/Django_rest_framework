import json
from rest_framework import status
from rest_framework.test import APITestCase, APILiveServerTestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import Project, ToDo


class TestProjectViewSet(APITestCase):

    def setUp(self) -> None:
        self.admin = User.objects.create_superuser(username='aleksandr', password='21778821')

    def test_get_all_projects(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_current_note_un(self):
        note = mixer.blend(ToDo)
        response = self.client.get(f'/api/notes/{note.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_current_note(self):
        note = mixer.blend(ToDo, text='Lorem Ipsum')
        self.client.login(username='aleksandr', password='21778821')
        response = self.client.get(f'/api/notes/{note.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['text'], 'Lorem Ipsum')
        response_book = json.loads(response.content)
        self.assertEqual(response_book.get('text'), 'Lorem Ipsum')
        self.client.logout()

    def test_update_project(self):
        project = mixer.blend(Project)
        self.client.login(username='aleksandr', password='21778821')
        response = self.client.patch(f'/api/projects/{project.uuid}/', {'name': 'New project'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project.get('name'), 'New project')
        self.client.logout()

    def test_delete_note(self):
        note = mixer.blend(ToDo)
        self.client.login(username='aleksandr', password='21778821')
        response = self.client.delete(f'/api/notes/{note.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.client.logout()




