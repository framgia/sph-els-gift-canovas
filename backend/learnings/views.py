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
    Follow,
    QuizTaken,
    UserActivityLog,
    UserAnswer,
    UserProfilePicture,
    Word,
)
from .serializers import (
    CategorySerializer,
    EditUserSerializer,
    EUserSerializer,
    UserActivityLogSerializer,
    UserAnswerSerializer,
    UserProfilePictureSerializer,
    WordSerializer,
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
                return Response({"message": "Success", "token": token, "is_admin": user.is_staff})
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
            if userAnswer.lower() == correct_answer.lower():
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

    def get(self, request, username):
        user = EUser.objects.filter(is_admin=False).exclude(username=username)
        serializer = EUserSerializer(user, many=True)
        return Response(serializer.data)


class UserDetails(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, username, follower_username, following_username):
        user = EUser.objects.get(username=username)
        serializer = EUserSerializer(user)
        try:
            image = UserProfilePicture.objects.get(user_id=user)
            serializer_image = UserProfilePictureSerializer(image)
            profile_details = serializer_image.data
        except Exception:
            profile_details = "None"
        if follower_username != "none" or following_username != "none":
            try:
                Follow.objects.get(
                    follower_id__username=follower_username,
                    following_id__username=following_username,
                )
                content = {
                    "status": "unfollow",
                    "data": serializer.data,
                    "profile_details": profile_details,
                }
            except Exception:
                content = {
                    "status": "follow",
                    "data": serializer.data,
                    "profile_details": profile_details,
                }
            return Response(content)
        content = {"data": serializer.data, "profile_details": profile_details}
        return Response(content)


class EditUserDetails(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
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


class NumberOfFollowersFollowing(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, username):
        followers = Follow.objects.filter(following_id__username=username).count()
        following = Follow.objects.filter(follower_id__username=username).count()
        return Response({"followers": followers, "following": following})


class QuizResults(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, username):
        number_of_words_learned = UserAnswer.objects.filter(
            user_id__username=username, is_correct=True
        ).count()
        number_of_categories_taken = QuizTaken.objects.filter(user_id__username=username).count()
        return Response(
            {
                "number_of_words_learned": number_of_words_learned,
                "number_of_categories_taken": number_of_categories_taken,
            }
        )


class GetUserActivityLog(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, page, username):
        if page == "dashboard":
            get_following_users = Follow.objects.filter(
                follower_id__username=username
            ).values_list("following_id__username", flat=True)
            users = list(get_following_users)
            users.append(username)
            activities = UserActivityLog.objects.filter(user_id__username__in=users).order_by(
                "-created_at"
            )
        else:
            activities = UserActivityLog.objects.filter(user_id__username=username).order_by(
                "-created_at"
            )
        serializer = UserActivityLogSerializer(activities, many=True)
        return Response(serializer.data)


class AddNewFollower(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        data = request.data
        follower = data["follower_username"]
        following = data["following_username"]

        follower_id = EUser.objects.get(username=follower)
        following_id = EUser.objects.get(username=following)

        Follow.objects.create(follower_id=follower_id, following_id=following_id)
        UserActivityLog.objects.create(
            user_id=follower_id, follow_id=following_id, activity_description="follow"
        )

        return Response({"Successfully Followed"})


class RemoveFollower(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, follower_username, following_username):
        follower = EUser.objects.get(username=follower_username)
        following = EUser.objects.get(username=following_username)
        Follow.objects.get(follower_id=follower, following_id=following).delete()
        UserActivityLog.objects.create(
            user_id=follower, follow_id=following, activity_description="unfollow"
        )
        return Response({"Successfully Unfollowed"})


class CategoryList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class WordsLearned(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, username):
        user_answers = UserAnswer.objects.filter(user_id__username=username, is_correct=True)
        serializer = UserAnswerSerializer(user_answers, many=True)
        return Response(serializer.data)


class AddCategory(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        data = request.data
        category_name = data["category_name"]
        description = data["description"]
        new_category = Category.objects.create(
            category_name=category_name, description=description
        )
        serializer = CategorySerializer(new_category)
        return Response(serializer.data)


class EditCategory(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class DeleteCategory(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "id"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"Successfully Deleted"})


class AddWordAndchoices(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        data = request.data
        category_id = data["category_id"]
        word = data["word"]
        correct_answer = data["correct_answer"].lower()
        choice_a = data["choice_a"].lower()
        choice_b = data["choice_b"].lower()
        choice_c = data["choice_c"].lower()
        choice_d = data["choice_d"].lower()
        choices = [choice_a, choice_b, choice_c, choice_d]
        if correct_answer in choices:
            category = Category.objects.get(id=category_id)
            new_word = Word.objects.create(
                category_id=category, word=word, correct_answer=correct_answer
            )
            Choices.objects.create(
                word_id=new_word,
                choice_a=choice_a,
                choice_b=choice_b,
                choice_c=choice_c,
                choice_d=choice_d,
            )
            return Response({"Successfully Created"})
        else:
            content = {"message": "Correct answer not in the choices"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class DeleteWord(generics.DestroyAPIView):
    queryset = Word.objects.all()
    lookup_field = "id"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"Successfully Deleted"})


class EditWordAndChoices(generics.UpdateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        data = request.data
        instance = self.get_object()
        serializer = self.get_serializer(instance, data, partial=True)
        serializer.is_valid(raise_exception=True)
        get_choice = Choices.objects.get(word_id=instance)
        choice_a = data["choice_a"]
        choice_b = data["choice_b"]
        choice_c = data["choice_c"]
        choice_d = data["choice_d"]
        get_choice.choice_a = choice_a
        get_choice.choice_b = choice_b
        get_choice.choice_c = choice_c
        get_choice.choice_d = choice_d
        get_choice.save()
        serializer.save()
        return Response(serializer.data)


class AdminUserList(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, username):
        user = EUser.objects.filter(is_admin=True).exclude(username=username)
        serializer = EUserSerializer(user, many=True)
        return Response(serializer.data)


class UploadProfilePicture(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        title = request.data["title"]
        picture = request.data["picture"]
        username = request.data["username"]
        get_user = EUser.objects.get(username=username)
        new_image = UserProfilePicture.objects.create(
            title=title, picture=picture, user_id=get_user
        )
        serializer = UserProfilePictureSerializer(new_image)
        return Response(serializer.data)


class UpdateProfilePicture(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = UserProfilePicture.objects.all()
    serializer_class = UserProfilePictureSerializer
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        title = request.data["title"]
        picture = request.data["picture"]
        username = request.data["username"]
        instance.title = title
        instance.picture = picture
        instance.username = EUser.objects.get(username=username)
        instance.save()
        serializer = UserProfilePictureSerializer(instance)
        return Response(serializer.data)
