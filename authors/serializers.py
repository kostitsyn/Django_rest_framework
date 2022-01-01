from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField, PrimaryKeyRelatedField
from .models import Author, Biography, Book, Article


# class AuthorSerializer(HyperlinkedModelSerializer):
#     class Meta:
#         model = Author
#         fields = '__all__'


class AuthorSerializerBase(ModelSerializer):
    class Meta:
        model = Author
        fields = ('first_name',)


class AuthorSerializerFullName(ModelSerializer):
    class Meta:
        model = Author
        fields = ('first_name', 'last_name')


class AuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class BiographySerializer(ModelSerializer):
    class Meta:
        model = Biography
        fields = ['text', 'author']


class BookSerializerBase(ModelSerializer):

    class Meta:
        model = Book
        fields = '__all__'


class BookSerializer(ModelSerializer):
    # authors = StringRelatedField(many=True)
    authors = AuthorSerializer(many=True)
    # authors = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Book
        fields = '__all__'


class ArticleSerializer(ModelSerializer):
    # author = AuthorSerializer()

    class Meta:
        model = Article
        # exclude = ['name']
        fields = '__all__'
