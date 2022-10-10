from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

from .models import EUser
from .serializers import EUserSerializer


class LoginView(ObtainAuthToken):
    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")
        try:
            user = User.objects.get(username=username)
            password = check_password(password, user.password)
            if password == True:
                get_token = Token.objects.get(user=user)
                token = str(get_token)
                return Response({"message": "Success", "token": token})
            else:
                return Response({"message": "Failed"})
        except Exception:
            return Response({"message": "Failed"})


class RegisterView(generics.CreateAPIView):
    queryset = EUser.objects.all()
    serializer_class = EUserSerializer

    def create(self, request):
        try:
            response = super().create(request)
            data = request.data
            username = data["username"]
            firstname = data["firstname"]
            lastname = data["lastname"]
            email = data["email"]
            password = data["password"]
            user = User.objects.create(
                username=username, email=email, first_name=firstname, last_name=lastname
            )
            user.set_password(password)
            user.save()
            Token.objects.create(user=user)
            return Response({"message": "Account Registered"})
        except Exception:
            content = {"message": "Account Not Registered"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
