from django.db import models


class User(models.Model):
    username = models.CharField(max_length=64)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    email = models.EmailField(max_length=150, unique=True)
    is_superuser = models.BooleanField(default=False, verbose_name='Суперпользователь')
    is_staff = models.BooleanField(default=False, verbose_name='Персонал')

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['username']

    def __str__(self):
        return f'{self.firstname} {self.lastname}'
