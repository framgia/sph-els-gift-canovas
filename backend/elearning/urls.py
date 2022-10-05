from django.contrib import admin
from django.urls import path

from learnings.views import (
    RegisterView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegisterView.as_view()),
]
