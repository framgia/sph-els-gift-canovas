from django.contrib import admin
from django.urls import path

from learnings.views import DisplayCategoryWithUserFilter, LoginView, RegisterView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", LoginView.as_view()),
    path("register/", RegisterView.as_view()),
    path("category/<str:user>/", DisplayCategoryWithUserFilter.as_view()),
]
