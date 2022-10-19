from rest_framework import serializers

from .models import Category, EUser, UserActivityLog, UserAnswer, Word


class EUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EUser
        fields = [
            "id",
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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category_name", "description"]


class UserAnswerSerializer(serializers.ModelSerializer):
    word = serializers.SerializerMethodField()

    class Meta:
        model = UserAnswer
        fields = ["id", "word", "user_answer", "is_correct"]

    def get_word(self, obj):
        get_word = Word.objects.get(id=obj.word_id.id)
        return get_word.word


class EditUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    firstname = serializers.CharField(required=False)
    lastname = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    confirm_password = serializers.CharField(required=False)

    class Meta:
        model = UserAnswer
        fields = ["username", "firstname", "lastname", "email", "password", "confirm_password"]


class UserActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivityLog
        fields = "__all__"
