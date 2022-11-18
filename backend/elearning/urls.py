from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from learnings.views import (
    AddCategory,
    AddNewFollower,
    AddWordAndchoices,
    AdminUserList,
    CategoryList,
    DeleteCategory,
    DeleteWord,
    DisplayCategoryWithUserFilter,
    EditCategory,
    EditUserDetails,
    EditWordAndChoices,
    GetResults,
    GetUserActivityLog,
    GetWordsPerCategory,
    LoginView,
    NotAdminUserList,
    NumberOfFollowersFollowing,
    QuizResults,
    RegisterView,
    RemoveFollower,
    UpdateProfilePicture,
    UploadProfilePicture,
    UserAnswerView,
    UserDetails,
    WordsLearned,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", LoginView.as_view()),
    path(
        "category/<str:user>/", DisplayCategoryWithUserFilter.as_view(), name="category_per_user"
    ),
    path("follow/", AddNewFollower.as_view()),
    path("get_words/<int:category_id>", GetWordsPerCategory.as_view()),
    path("not_admin_users/<str:username>", NotAdminUserList.as_view()),
    path("register/", RegisterView.as_view()),
    path("results/<int:quiz_taken_id>", GetResults.as_view()),
    path("user_answer/", UserAnswerView.as_view()),
    path("edit_user_details/<int:id>/", EditUserDetails.as_view()),
    path("quiz_results/<str:username>", QuizResults.as_view()),
    path("activity_log/<str:page>/<str:username>/", GetUserActivityLog.as_view()),
    path("unfollow/<str:follower_username>/<str:following_username>/", RemoveFollower.as_view()),
    path(
        "user_details/<str:username>/<str:follower_username>/<str:following_username>/",
        UserDetails.as_view(),
    ),
    path("number_of_followers_following/<str:username>/", NumberOfFollowersFollowing.as_view()),
    path("category_list/", CategoryList.as_view(), name="category_list"),
    path("add_category/", AddCategory.as_view(), name="add_category"),
    path("edit_category/<int:id>", EditCategory.as_view(), name="edit_category"),
    path("delete_category/<int:id>", DeleteCategory.as_view(), name="delete_category"),
    path("words_learned/<str:username>", WordsLearned.as_view(), name="words_learned"),
    path("add_words_choices/", AddWordAndchoices.as_view()),
    path("delete_word/<int:id>", DeleteWord.as_view()),
    path("edit_word_choices/<int:id>", EditWordAndChoices.as_view()),
    path("admin_users/<str:username>", AdminUserList.as_view()),
    path("upload_profile_picture/", UploadProfilePicture.as_view()),
    path("update_profile_picture/<int:id>", UpdateProfilePicture.as_view()),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
