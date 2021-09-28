import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from usersapp.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_notes = graphene.List(ToDoType)
    project_by_uuid = graphene.Field(ProjectType, uuid=graphene.String(required=True))
    notes_by_project_uuid = graphene.Field(ToDoType, uuid=graphene.String(required=False))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_notes(root, info):
        return ToDo.objects.all()

    def resolve_project_by_uuid(root, info, uuid):
        try:
            return Project.objects.get(pk=uuid)
        except Project.DoesNotExist:
            return

    def resolve_notes_by_project_uuid(root, info, uuid=None):
        if uuid:
            return ToDo.objects.filter(project__uuid=uuid)
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
