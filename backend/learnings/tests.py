from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Category


class CategoryAPIViewTests(APITestCase):
    add_category_url = "http://127.0.0.1:8000/add_category/"
    category_list_url = "http://127.0.0.1:8000/category_list/"
    category_per_user_url = "http://127.0.0.1:8000/category/"
    delete_category_url = "http://127.0.0.1:8000/delete_category/"
    edit_category_url = "http://127.0.0.1:8000/edit_category/"

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
        Category.objects.create(
            category_name="Category Testing 1",
            description="Category Testing 1 Description",
        )

    def test_post_category(self):
        data = {
            "category_name": "Category Testing 1",
            "description": "Category Testing 1 Description",
        }
        response = self.client.post(self.add_category_url, data, format="json")
        self.assertEqual(response.status_code, 200)

    def test_get_category_list(self):
        response = self.client.get(self.category_list_url)
        self.assertEqual(response.status_code, 200)

    def test_patch_category(self):
        id = "1"
        data = {
            "category_name": "Category Testing 1 Update",
            "description": "Category Testing 1 Description Update",
        }
        response = self.client.patch(f"{self.edit_category_url}{id}", data, format="json")
        self.assertEqual(response.status_code, 200)

    def test_delete_category(self):
        id = "1"
        response = self.client.delete(f"{self.delete_category_url}{id}")
        self.assertEqual(response.status_code, 200)

    def test_get_category_per_user(self):
        user = "Becs"
        response = self.client.get(f"{self.category_per_user_url}{user}/")
        self.assertEqual(response.status_code, 200)
