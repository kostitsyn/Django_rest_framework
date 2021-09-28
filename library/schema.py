import graphene
from graphene_django import DjangoObjectType
from authors.models import Book, Author


class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = '__all__'


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = '__all__'


class AuthorMutation(graphene.Mutation):
    class Arguments:
        birthday_year = graphene.Int(required=True)
        uuid = graphene.String()

    author = graphene.Field(AuthorType)

    @classmethod
    def mutate(cls, root, info, birthday_year, uuid):
        author = Author.objects.get(pk=uuid)
        author.birthday_year = birthday_year
        author.save()
        return AuthorMutation(author=author)


class Mutation(graphene.ObjectType):
    update_author = AuthorMutation.Field()


class Query(graphene.ObjectType):
    all_books = graphene.List(BookType)
    all_authors = graphene.List(AuthorType)

    author_by_uuid = graphene.Field(AuthorType, uuid=graphene.String(required=True))
    books_by_author_name = graphene.List(BookType, name=graphene.String(required=False))

    def resolve_all_books(root, info):
        return Book.objects.all()

    def resolve_all_authors(root, info):
        return Author.objects.all()

    def resolve_author_by_uuid(self, info, uuid):
        try:
            return Author.objects.get(uuid=uuid)
        except Author.DoesNotExist:
            return None

    def resolve_books_by_author_name(self, info, name=None):
        books = Book.objects.all()
        if name:
            books = books.filter(authors__first_name=name)
        return books


schema = graphene.Schema(query=Query, mutation=Mutation)
