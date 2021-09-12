from django.core.management.base import BaseCommand, CommandError
from mainapp.models import User, Article
from uuid import uuid4
from mimesis import Person, Text
from datetime import datetime
from random import choice


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('quantity_users', type=int, help='Количество создаваемых пользователей')
        parser.add_argument('quantity_articles', type=int, help='Количество создаваемых статей')

    def handle(self, *args, **options):
        self.create_users(options['quantity_users'])
        self.create_articles(options['quantity_articles'])

    def create_users(self, quantity):
        _user = Person('ru')
        for i in range(quantity):
            user = User(uuid=uuid4(),
                        username=_user.username('U_d'),
                        firstname=_user.first_name(),
                        lastname=_user.last_name(),
                        email=_user.email(domains=['yandex.ru', 'mail.ru']))
            try:
                user.save()
            except Exception:
                raise CommandError(f'Cannot create user "{user.username}"')
            self.stdout.write(self.style.SUCCESS(f'Successfully created user {user.firstname} {user.lastname}'))

    def create_articles(self, quantity):
        _article = Text('ru')
        for i in range(quantity):
            article = Article(uuid=uuid4(),
                              name=_article.title(),
                              text=_article.text(quantity=10),
                              user=self.get_random_user(),
                              created=datetime.now())
            try:
                article.save()
            except Exception:
                raise CommandError(f'Cannot create article "{article.name}"')
            self.stdout.write(self.style.SUCCESS(f'Successfully created article {article.name}'))

    def get_random_user(self):
        users = User.objects.all()
        return choice(users)

