import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase, APISimpleTestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import AuthorModelViewSet
from .models import Author, Book


class TestAuthorViewSet(TestCase):
    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.admin = User.objects.create_superuser('django', 'django@support.ru', '21778821')
        self.client_1 = APIClient()

    def test_get_list(self):
        request = self.factory.get('/api/authors/')
        view = AuthorModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        request = self.factory.post('/api/authors/', {'first_name': 'John', 'last_name': 'Doe', 'birthday_year': 2000},
                                     format='json')
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        request = self.factory.post('/api/authors', {'first_name': 'John', 'last_name': 'Doe', 'birthday_year': 2000},
                                    format='json')
        force_authenticate(request, self.admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        author = Author.objects.create(first_name='John', last_name='Doe', birthday_year=1991)
        response = self.client_1.get(f'/api/authors/{author.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_first_name(self):
        author = Author.objects.create(first_name='John', last_name='Doe', birthday_year=1991)
        response = self.client_1.get(f'/api/authors/{author.uuid}/')
        self.assertEqual(response.data['first_name'], 'John')

    def test_edit_guest(self):
        author = Author.objects.create(first_name='John', last_name='Doe', birthday_year=1991)
        response = self.client_1.patch(f'/api/authors/{author.uuid}/', {'first_name': 'Vasya', 'last_name': 'Pupkin'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        author = Author.objects.create(first_name='John', last_name='Doe', birthday_year=1991)
        self.client_1.login(username='django', password='21778821')
        response = self.client_1.patch(f'/api/authors/{author.uuid}/', {'first_name': 'Vasya', 'last_name': 'Pupkin'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        author = Author.objects.get(uuid=author.uuid)
        self.assertEqual(author.first_name, 'Vasya')
        self.assertEqual(author.last_name, 'Pupkin')
        self.client.logout()


class TestMath(APISimpleTestCase):
    def test_degree(self):
        self.assertEqual(2**2**2, 16)


class TestBookViewSet(APITestCase):

    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('django', 'django@support.ru', '21778821')

    def test_get_list(self):
        response = self.client.get('/api/books/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        author = Author.objects.create(first_name='John', last_name='Doe', birthday_year=1991)
        author_1 = Author.objects.create(first_name='Vasya', last_name='Pupkin', birthday_year=1981)
        book = Book.objects.create(name='Super Book)')
        book.authors.add(author)
        self.client.login(username='django', password='21778821')
        response = self.client.patch(f'/api/books/{book.uuid}/', {'name': 'Full shit book('})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        book = Book.objects.get(uuid=book.uuid)
        self.assertEqual(book.name, 'Full shit book(')
        self.client.logout()

    def test_edit_mixer(self):
        book = mixer.blend(Book, name='We are Motorhead')
        self.client.login(username='django', password='21778821')
        response = self.client.patch(f'/api/books/{book.uuid}/', {'name': 'Full shit book('})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_get_detail_author(self):
        book = mixer.blend(Book)
        author = mixer.blend(Author, first_name='Aleksandr')
        book.authors.add(author)
        response = self.client.get(f'/api/books/{book.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_book = json.loads(response.content)
        self.assertEqual(response_book['authors'][0]['firstName'], 'Aleksandr')