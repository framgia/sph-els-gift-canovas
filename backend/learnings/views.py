from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

from .models import EUser
from .serializers import EUserSerializer


class LoginView(ObtainAuthToken):
    def post(self, request):
        data = request.data
        username = data.get("username")
        try:
            user = User.objects.get(username=username)
            get_token = Token.objects.get(user=user)
            token = str(get_token)
            return Response({"message": "Success", "token": token})
        except Exception:
            return Response({"message": "Failed"})


class RegisterView(generics.CreateAPIView):
    queryset = EUser.objects.all()
    serializer_class = EUserSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({"status": 200, "message": "Account Registered", "data": response.data})

    def perform_create(self, serializer):
        username = serializer.validated_data["username"]
        firstname = serializer.validated_data["firstname"]
        lastname = serializer.validated_data["lastname"]
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = User.objects.create(
            username=username, email=email, first_name=firstname, last_name=lastname
        )
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)
