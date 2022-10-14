from django.contrib import admin
from django.urls import path

from learnings.views import (
    DisplayCategoryWithUserFilter,
    GetResults,
    GetWordsPerCategory,
    LoginView,
    RegisterView,
    UserAnswerView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", LoginView.as_view()),
    path("register/", RegisterView.as_view()),
    path("category/<str:user>/", DisplayCategoryWithUserFilter.as_view()),
    path("get_words/<int:category_id>", GetWordsPerCategory.as_view()),
    path("user_answer/", UserAnswerView.as_view()),
    path("results/<int:quiz_taken_id>", GetResults.as_view()),
]
