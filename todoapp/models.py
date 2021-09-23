from django.db import models
from usersapp.models import User
from uuid import uuid4


class Project(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(max_length=128, verbose_name='Название проекта')
    repo_link = models.URLField(max_length=512, verbose_name='Ссылка на репозаторий')
    users = models.ManyToManyField(User)

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'
        ordering = ['name']

    def __str__(self):
        return self.name


class ToDo(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(max_length=1000, verbose_name='Текст заметки')
    date_created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    date_updated = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name='Активна', default=True)

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
        ordering = ['-date_created']

    def __str__(self):
        return f'Заметка к проекту {self.project.name}'

