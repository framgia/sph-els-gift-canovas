from django.contrib import admin
from django.urls import path

<<<<<<< HEAD
from learnings.views import (
    DisplayCategoryWithUserFilter,
    GetWordsPerCategory,
    LoginView,
    RegisterView,
)
=======
from learnings.views import GetWordsPerCategory, LoginView, RegisterView, UserAnswerView
>>>>>>> e886193 ([SELS-15] [FE/BE] ANSWER - Create endpoint for answer user (UserAnswer Model to Word Model))

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", LoginView.as_view()),
<<<<<<< HEAD
    path("register/", RegisterView.as_view()),
    path("category/<str:user>/", DisplayCategoryWithUserFilter.as_view()),
    path("get_words/<int:category_id>", GetWordsPerCategory.as_view()),
=======
    path("get_words/<int:category_id>", GetWordsPerCategory.as_view()),
    path("register/", RegisterView.as_view()),
    path("user_answer/", UserAnswerView.as_view()),
>>>>>>> e886193 ([SELS-15] [FE/BE] ANSWER - Create endpoint for answer user (UserAnswer Model to Word Model))
]
