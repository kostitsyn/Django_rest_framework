from rest_framework import viewsets
from rest_framework import mixins
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerBase, UserModelSerializerRole


class UserModelViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.CreateModelMixin,
                       mixins.DestroyModelMixin,
                       viewsets.GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '0.1':
            return UserModelSerializerRole
        elif self.request.version == '0.2':
            return UserModelSerializer
        else:
            return UserModelSerializerBase
