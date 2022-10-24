from django.contrib import admin
from django.urls import path

from learnings.views import (
    AddNewFollower,
    Dashboard,
    DisplayCategoryWithUserFilter,
    EditUserDetails,
    GetResults,
    GetUserActivityLog,
    GetWordsPerCategory,
    LoginView,
    NotAdminUserList,
    NumberOfFollowersFollowing,
    RegisterView,
    RemoveFollower,
    UserAnswerView,
    UserDetails,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", LoginView.as_view()),
    path("category/<str:user>/", DisplayCategoryWithUserFilter.as_view()),
    path("follow/", AddNewFollower.as_view()),
    path("get_words/<int:category_id>", GetWordsPerCategory.as_view()),
    path("not_admin_users/<str:username>", NotAdminUserList.as_view()),
    path("register/", RegisterView.as_view()),
    path("results/<int:quiz_taken_id>", GetResults.as_view()),
    path("user_answer/", UserAnswerView.as_view()),
    path("edit_user_details/<int:id>/", EditUserDetails.as_view()),
    path("dashboard/<str:username>", Dashboard.as_view()),
    path("activity_log/<str:page>/<str:username>/", GetUserActivityLog.as_view()),
    path("unfollow/<str:follower_username>/<str:following_username>/", RemoveFollower.as_view()),
    path(
        "user_details/<str:username>/<str:follower_username>/<str:following_username>/",
        UserDetails.as_view(),
    ),
    path("number_of_followers_following/<str:username>/", NumberOfFollowersFollowing.as_view()),
    path("activity_log/<str:page>/<str:username>/", GetUserActivityLog.as_view()),
]
