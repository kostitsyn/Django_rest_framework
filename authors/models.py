from django.db import models
from uuid import uuid4


class BaseModel(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4)

    class Meta:
        abstract = True


class Author(BaseModel):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.IntegerField()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Biography(BaseModel):
    text = models.TextField()
    author = models.OneToOneField(Author, on_delete=models.CASCADE)


class Book(BaseModel):
    name = models.CharField(max_length=32)
    authors = models.ManyToManyField(Author)


class Article(BaseModel):
    name = models.CharField(max_length=32)
    author = models.ForeignKey(Author, models.PROTECT)
