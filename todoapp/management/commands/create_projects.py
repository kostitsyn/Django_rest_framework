from django.core.management.base import BaseCommand, CommandError
from todoapp.models import Project, ToDo
from usersapp.models import User
from uuid import uuid4
from mimesis import Generic, Text, Internet
from datetime import datetime
from random import choice, sample


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('quantity_projects', type=int, help='Количество создаваемых проектов')
        parser.add_argument('quantity_notes', type=int, help='Количество создаваемых заметок')

    def handle(self, *args, **options):
        self.create_projects(options['quantity_projects'])
        self.create_notes(options['quantity_notes'])

    def create_projects(self, quantity):
        _project = Generic('ru')
        _project.add_provider(Internet)
        _project.add_provider(Text)
        for i in range(quantity):
            project = Project(name=_project.text.title(),
                              repo_link=_project.internet.home_page()
                    )
            try:
                project.save()
                users = self.get_random_users()
                project.users.set(users)
            except Exception as e:
                print(e)
                raise CommandError(f'Cannot create project "{project.name}"')
            self.stdout.write(self.style.SUCCESS(f'Successfully created project {project.name}'))

    def create_notes(self, quantity):
        _note = Text('ru')
        for i in range(quantity):
            note = ToDo(project=self.get_random_project(),
                        text=_note.text(quantity=2),
                        date_created=datetime.now(),
                        date_updated=datetime.now(),
                        user=self.get_random_user(),
                        is_active=choice([True, False]))
            try:
                note.save()
            except Exception as e:
                print(e)
                raise CommandError(f'Cannot create note with project "{note.project.name}"')
            self.stdout.write(self.style.SUCCESS(f'Successfully created note with project {note.project.name}'))

    def get_random_user(self):
        return choice(User.objects.all())

    def get_random_users(self):
        users = User.objects.all()
        quantity = 3
        while True:
            try:
                users = sample(list(users), quantity)
            except ValueError:
                quantity -= 1
            else:
                break
        return users

    def get_random_project(self):
        return choice(Project.objects.all())
