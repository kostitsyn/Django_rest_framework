from django.core.management.base import BaseCommand, CommandError
from authors.models import Author, Biography, Book, Article
from mimesis import Person, Text
import random


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('quantity_authors', type=int, help='Количество создаваемых авторов')
        parser.add_argument('quantity_books', type=int, help='Количество создаваемых книг')
        parser.add_argument('quantity_articles', type=int, help='Количество создаваемых статей')

    def handle(self, *args, **options):
        self.create_authors(options['quantity_authors'])
        self.create_biographies(options['quantity_authors'])
        self.create_books(options['quantity_books'])
        self.create_articles(options['quantity_articles'])

    def create_authors(self, quantity):
        _author = Person('ru')
        for i in range(quantity):
            author = Author(first_name=_author.first_name(),
                            last_name=_author.last_name(),
                            birthday_year=random.randint(1700, 1950))
            try:
                author.save()
            except Exception:
                raise CommandError(f'Cannot create author {author.first_name} {author.last_name}')
            self.stdout.write(self.style.SUCCESS(f"Successfully created user {author.first_name} {author.last_name}"))

    def create_biographies(self, quantity):
        all_authors = Author.objects.all()
        new_authors = all_authors[len(all_authors)-quantity:]
        _text = Text('ru')
        for author in new_authors:
            biography = Biography(text=_text.text(quantity=3),
                                  author=author)
            try:
                biography.save()
            except Exception:
                raise CommandError(f'Cannot create biography of the author '
                                   f'{biography.author.first_name} {biography.author.last_name}')
            self.stdout.write(self.style.SUCCESS(f"Successfully created biography of the author "
                                                 f"{biography.author.first_name} {biography.author.last_name}"))

    def create_books(self, quantity):
        _name = Text('ru')
        for i in range(quantity):
            book = Book(name=_name.answer())
            try:
                book.save()
                authors = self.get_random_authors()
                book.authors.set(authors)
            except Exception:
                raise CommandError(f'Cannot create book "{book.name}"')
            self.stdout.write(self.style.SUCCESS(f'Successfully created book {book.name}'))

    def create_articles(self, quantity):
        _name = Text('ru')
        for i in range(quantity):
            article = Article(name=_name.title(),
                              author=self.get_random_author())
            try:
                article.save()
            except Exception:
                raise CommandError(f'Cannot create project "{article.name}"')
            self.stdout.write(self.style.SUCCESS(f'Successfully created project {article.name}'))

    def get_random_authors(self):
        authors = Author.objects.all()
        quantity = random.randint(1, 3)
        while True:
            try:
                authors = random.sample(list(authors), quantity)
            except ValueError:
                quantity -= 1
            else:
                break
        return authors

    def get_random_author(self):
        return random.choice(Author.objects.all())
