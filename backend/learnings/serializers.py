from rest_framework import serializers

from .models import EUser


class EUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EUser
        fields = [
            "username",
            "firstname",
            "lastname",
            "email",
            "password",
            "confirm_password",
            "is_admin",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
