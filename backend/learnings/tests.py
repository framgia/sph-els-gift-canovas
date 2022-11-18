from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Category, Choices, EUser, QuizTaken, UserAnswer, Word


class CategoryAPIViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="Becs",
            email="email@gmail.com",
            first_name="firstname",
            last_name="lastname",
            password="canovas#123",
        )
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        category = Category.objects.create(
            category_name="Category Testing 1",
            description="Category Testing 1 Description",
        )
        self.add_category_url = reverse("add_category")
        self.category_list_url = reverse("category_list")
        self.category_per_user_url = reverse("category_per_user", args=[self.user.username])
        self.delete_category_url = reverse("delete_category", args=[category.id])
        self.edit_category_url = reverse("edit_category", args=[category.id])

    def test_post_category(self):
        data = {
            "category_name": "Category Testing 1",
            "description": "Category Testing 1 Description",
        }
        response = self.client.post(self.add_category_url, data, format="json")
        self.assertEqual(response.status_code, 200)

    def test_get_category_list(self):
        response = self.client.get(self.category_list_url)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, 200)

    def test_patch_category(self):
        data = {
            "category_name": "Category Testing 1 Update",
            "description": "Category Testing 1 Description Update",
        }
        response = self.client.patch(self.edit_category_url, data, format="json")
        self.assertEqual(response.status_code, 200)

    def test_delete_category(self):
        response = self.client.delete(self.delete_category_url)
        self.assertEqual(response.data, {"Successfully Deleted"})
        self.assertEqual(response.status_code, 200)

    def test_get_category_per_user(self):
        response = self.client.get(self.category_per_user_url)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, 200)


class QuizAPIViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="Becs",
            email="email@gmail.com",
            first_name="firstname",
            last_name="lastname",
            password="canovas#123",
        )
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.euser = EUser.objects.create(
            username="Becs",
            firstname="Rebbeca",
            lastname="Evans",
            email="rebeccaevans@gmail.com",
            password="canovas#123",
            confirm_password="canovas#123",
            is_admin=False,
        )
        self.category = Category.objects.create(
            category_name="Category Testing 1",
            description="Category Testing 1 Description",
        )
        self.word = Word.objects.create(
            category_id=self.category, word="Tapulan", correct_answer="Lazy"
        )
        Choices.objects.create(
            word_id=self.word,
            choice_a="Smelly",
            choice_b="Ugly",
            choice_c="Lazy",
            choice_d="Sure",
        )
        new_quiz = QuizTaken.objects.create(user_id=self.euser, category_id=self.category)
        UserAnswer.objects.create(
            user_id=self.euser,
            word_id=self.word,
            quiz_taken_id=new_quiz,
            user_answer="Lazy",
            is_correct=True,
        )

        self.user_answer_url = reverse("user_answer")
        self.results_url = reverse("results", args=[new_quiz.id])

    def test_post_user_answer(self):
        data = {
            "category_id": self.category.id,
            "username": self.euser.username,
            "userAnswers": [
                {
                    "correct_answer": "Lazy",
                    "userAnswer": "Sure",
                    "word": "Tapulan",
                    "word_id": self.word.id,
                },
            ],
        }
        response = self.client.post(self.user_answer_url, data, format="json")

        self.assertEqual(response.data, {"quiz_taken_id": 2})
        self.assertEqual(response.status_code, 200)

    def test_get_results(self):
        response = self.client.get(self.results_url)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, 200)
