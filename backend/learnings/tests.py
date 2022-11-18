from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Category, EUser


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


class UsersAPIViewTests(APITestCase):
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
        self.not_admin_user1 = EUser.objects.create(
            username="Becs",
            firstname="Rebbeca",
            lastname="Evans",
            email="rebeccaevans@gmail.com",
            password="canovas#123",
            confirm_password="canovas#123",
            is_admin=False,
        )
        self.not_admin_user2 = EUser.objects.create(
            username="Trisha",
            firstname="Trisha",
            lastname="Duron",
            email="trishaduron@gmail.com",
            password="canovas#123",
            confirm_password="canovas#123",
            is_admin=False,
        )
        self.admin_user1 = EUser.objects.create(
            username="Pif",
            firstname="Pif",
            lastname="Villaro",
            email="piffa@gmail.com",
            password="canovas#123",
            confirm_password="canovas#123",
            is_admin=True,
        )
        self.admin_user2 = EUser.objects.create(
            username="James",
            firstname="James",
            lastname="Rodwin",
            email="jamesrodwin@gmail.com",
            password="canovas#123",
            confirm_password="canovas#123",
            is_admin=True,
        )

        self.not_admin_users_url = reverse("not_admin_users", args=[self.not_admin_user1.username])
        self.admin_users_url = reverse("admin_users", args=[self.admin_user1.username])

    def test_get_not_admin_user_list(self):
        response = self.client.get(self.not_admin_users_url)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, 200)

    def test_get_admin_user_list(self):
        response = self.client.get(self.admin_users_url)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, 200)
