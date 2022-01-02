from django.db import models
from uuid import uuid4


# class BaseModel(models.Model):
#     uuid = models.UUIDField(primary_key=True, default=uuid4)
#
#     class Meta:
#         abstract = True


# class Author(BaseModel):
class Author(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.IntegerField()

    class Meta:
        verbose_name = 'Автор'
        verbose_name_plural = 'Авторы'

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Biography(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4)
    text = models.TextField()
    author = models.OneToOneField(Author, on_delete=models.CASCADE)


class Book(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(max_length=32)
    authors = models.ManyToManyField(Author)

    def __str__(self):
        return self.name


class Article(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(max_length=512)
    author = models.ForeignKey(Author, on_delete=models.PROTECT)
