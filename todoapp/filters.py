from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filters.FilterSet):
    date_created = filters.DateFilter(lookup_expr='gte')

    class Meta:
        model = ToDo
        fields = ['date_created']
