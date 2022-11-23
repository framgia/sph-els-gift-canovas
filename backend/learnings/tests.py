from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Category, EUser, Follow, UserActivityLog


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


class GetUserActivityLogAPIViewTests(APITestCase):
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

        follower_id = EUser.objects.create(
            username="Becs",
            firstname="Rebbeca",
            lastname="Evans",
            email="rebeccaevans@gmail.com",
            password="canovas#123",
            confirm_password="canovas#123",
            is_admin=False,
        )
        following_id = EUser.objects.create(
            username="Pif",
            firstname="Pif",
            lastname="Villaro",
            email="piffa@gmail.com",
            password="canovas#123",
            confirm_password="canovas#123",
            is_admin=False,
        )
        Follow.objects.create(follower_id=follower_id, following_id=following_id)
        UserActivityLog.objects.create(
            user_id=follower_id, follow_id=following_id, activity_description="follow"
        )

    def test_get_user_dashboard_activity_log(self):
        page = "dashboard"
        activity_log_url = reverse("activity_log", args=[page, self.user.username])
        response = self.client.get(activity_log_url)
        self.assertEqual(response.status_code, 200)

    def test_get_user_profile_activity_log(self):
        page = "profile"
        activity_log_url = reverse("activity_log", args=[page, self.user.username])
        response = self.client.get(activity_log_url)
        self.assertEqual(response.status_code, 200)
