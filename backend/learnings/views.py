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

from .models import Category, Choices, EUser, QuizTaken, UserAnswer, Word
from .serializers import CategorySerializer, EUserSerializer


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

        QuizTaken.objects.create(user_id=user, category_id=category)
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
        results = []
        get_quiz_taken_instance = QuizTaken.objects.get(id=quiz_taken_id)
        get_user_answers = UserAnswer.objects.filter(quiz_taken_id=get_quiz_taken_instance.id)
        for data in get_user_answers:
            get_word = Word.objects.get(id=data.word_id.id)
            results.append(
                {
                    "id": data.id,
                    "user_answer": data.user_answer,
                    "word": get_word.word,
                    "is_correct": data.is_correct,
                }
            )
        return Response(results)
