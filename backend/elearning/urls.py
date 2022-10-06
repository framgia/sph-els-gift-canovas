from django.contrib import admin
from django.urls import path
from learnings.views import RegisterView
from rest_framework.authtoken.views import obtain_auth_token

# moved by linter/isort

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', obtain_auth_token),
    path('register/', RegisterView.as_view()),
]
