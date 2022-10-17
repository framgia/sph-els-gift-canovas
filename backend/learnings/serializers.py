from rest_framework import serializers

from .models import Category, EUser, UserAnswer, Word


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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category_name", "description"]


class UserAnswerSerializer(serializers.ModelSerializer):
    word = serializers.SerializerMethodField("get_word_only")

    class Meta:
        model = UserAnswer
        fields = ["id", "word", "user_answer", "is_correct"]

    def get_word_only(self, obj):
        get_word = Word.objects.get(id=obj.word_id.id)
        return get_word.word
