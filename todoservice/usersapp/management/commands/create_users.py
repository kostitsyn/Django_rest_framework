from django.core.management.base import BaseCommand, CommandError
from usersapp.models import User
from uuid import uuid4
from mimesis import Person


class Command(BaseCommand):
    help = "Create as many users as was specified in the parametr"

    def add_arguments(self, parser):
        parser.add_argument("quantity", type=int, help="Количество создаваемых пользователей")

    def handle(self, *args, **options):
        for i in range(options['quantity']):
            user = Person('ru')
            user = User(uuid=uuid4(),
                        username=user.username('U_d'),
                        firstname=user.first_name(),
                        lastname=user.last_name(),
                        email=user.email(domains=['yandex.ru', 'mail.ru']))
            try:
                user.save()
            except Exception:
                raise CommandError(f'Cannot create user {user.firstname} {user.lastname}')
            self.stdout.write(self.style.SUCCESS(f"Successfully created user {user.firstname} {user.lastname}"))
