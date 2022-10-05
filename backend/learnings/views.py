from rest_framework.response import Response
from rest_framework import generics
from django.contrib.auth.models import User

from .models import EUser
from .serializers import EUserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = EUser.objects.all()
    serializer_class = EUserSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            'status': 200,
            'message': 'Account Registered',
            'data': response.data
        })

    def perform_create(self, serializer):
        username = serializer.validated_data['username']
        firstname = serializer.validated_data['firstname']
        lastname = serializer.validated_data['lastname']
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = User.objects.create(
            username=username,
            email=email,
            first_name=firstname,
            last_name=lastname
        )

        user.set_password(password)
        user.save()