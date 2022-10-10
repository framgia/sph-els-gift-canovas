from django.contrib import admin
from django.urls import path
from learnings.views import LoginView, RegisterView

# can't add space between learnings and django

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", LoginView.as_view()),
    path("register/", RegisterView.as_view()),
]
