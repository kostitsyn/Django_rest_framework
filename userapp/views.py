from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializers, UserSerializerWithFullName, UserSerializersWithAdmin


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()

    def get_serializer_class(self):
        # print(self.request.version)
        if self.request.version == '0.2':
            return UserSerializerWithFullName
        elif self.request.version == '0.1':
            return UserSerializersWithAdmin
        return UserSerializers
