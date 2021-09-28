from rest_framework import viewsets
from rest_framework import mixins
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerWithStatus


class UserModelViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       # mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '0.1':
            return UserModelSerializer
        return UserModelSerializerWithStatus
