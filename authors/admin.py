from django.contrib import admin
from authors.models import *



admin.site.register(Author)
admin.site.register(Article)
admin.site.register(Book)
admin.site.register(Biography)

