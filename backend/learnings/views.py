from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import (
    Category,
    Choices,
    EUser,
    QuizTaken,
    UserActivityLog,
    UserAnswer,
    Word,
)
from .serializers import (
    CategorySerializer,
    EditUserSerializer,
    EUserSerializer,
    UserAnswerSerializer,
)


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
            is_admin = data["is_admin"]
            if is_admin == True:
                user = User.objects.create(
                    username=username,
                    email=email,
                    first_name=firstname,
                    last_name=lastname,
                    is_staff=True,
                    is_active=True,
                    is_superuser=True,
                )
            else:
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


class DisplayCategoryWithUserFilter(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, user):
        get_category = Category.objects.filter(~Q(quiztaken__user_id__username=user))
        serializer = CategorySerializer(get_category, many=True)
        return Response({"categories": serializer.data})


class GetWordsPerCategory(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, category_id):
        word_per_category_with_choices = []
        get_category = Category.objects.get(id=category_id)
        get_words = Word.objects.filter(category_id=get_category)
        for word in get_words:
            get_choices = Choices.objects.get(word_id=word.id)
            word_per_category_with_choices.append(
                {
                    "word_id": get_choices.id,
                    "category_id": word.category_id.id,
                    "word": word.word,
                    "correct_answer": word.correct_answer,
                    "choice_a": get_choices.choice_a,
                    "choice_b": get_choices.choice_b,
                    "choice_c": get_choices.choice_c,
                    "choice_d": get_choices.choice_d,
                }
            )
        content = {
            "category_name": get_category.category_name,
            "words": word_per_category_with_choices,
        }
        return Response(content)


class UserAnswerView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        data = request.data
        category = Category.objects.get(id=data["category_id"])
        user = EUser.objects.get(username=data["username"])

        quiz = QuizTaken.objects.create(user_id=user, category_id=category)
        UserActivityLog.objects.create(
            user_id=user, quiz_taken_id=quiz, activity_description="quiz"
        )
        get_quiz_taken_instance = QuizTaken.objects.last()
        user_answers = data["userAnswers"]
        for answers in user_answers:
            check = False
            userAnswer = answers["userAnswer"]
            word_id = answers["word_id"]
            correct_answer = answers["correct_answer"]
            word = answers["word"]

            word = Word.objects.get(id=word_id)
            if userAnswer == correct_answer:
                check = True
            UserAnswer.objects.create(
                user_id=user,
                word_id=word,
                quiz_taken_id=get_quiz_taken_instance,
                user_answer=userAnswer,
                is_correct=check,
            )
        return Response({"quiz_taken_id": get_quiz_taken_instance.id})


class GetResults(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, quiz_taken_id):
        get_user_answers = UserAnswer.objects.filter(quiz_taken_id_id=quiz_taken_id)
        serializers = UserAnswerSerializer(get_user_answers, many=True)
        return Response(serializers.data)


class NotAdminUserList(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = EUser.objects.filter(is_admin=False)
        serializer = EUserSerializer(user, many=True)
        return Response(serializer.data)


class UserDetails(generics.RetrieveAPIView):
    queryset = EUser.objects.all()
    serializer_class = EUserSerializer
    lookup_field = "username"


class EditUserDetails(generics.UpdateAPIView):
    queryset = EUser.objects.all()
    serializer_class = EditUserSerializer
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(username=instance.username)
        user.set_password(serializer.validated_data["password"])
        user.username = serializer.validated_data["username"]
        user.save()
        serializer.save()
        return Response(serializer.data)


class NumberOfCategoriesTaken(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, username):
        number_of_categories_taken = QuizTaken.objects.filter(user_id__username=username).count()
        return Response({"number_of_categories_taken": number_of_categories_taken})


class NumberOfWordsLearned(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, username):
        number_of_words_learned = UserAnswer.objects.filter(
            user_id__username=username, is_correct=True
        ).count()
        return Response({"number_of_words_learned": number_of_words_learned})
