from django.db import models


class EUser(models.Model):
    username = models.CharField(max_length=50, unique=True)
    lastname = models.CharField(max_length=254)
    firstname = models.CharField(max_length=254)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=254)
    confirm_password = models.CharField(max_length=254)
    is_admin = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "EUser"


class Follow(models.Model):
    follower_id = models.ForeignKey(EUser, on_delete=models.CASCADE, related_name="follower_id")
    following_id = models.ForeignKey(EUser, on_delete=models.CASCADE, related_name="following_id")

    class Meta:
        verbose_name_plural = "Follow"


class Category(models.Model):
    category_name = models.CharField(max_length=254)
    description = models.CharField(max_length=254)

    class Meta:
        verbose_name_plural = "Category"


class QuizTaken(models.Model):
    user_id = models.ForeignKey(EUser, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "QuizTaken"


class Word(models.Model):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    word = models.CharField(max_length=254)
    correct_answer = models.CharField(max_length=254)

    class Meta:
        verbose_name_plural = "Word"


class Choices(models.Model):
    word_id = models.ForeignKey(Word, on_delete=models.CASCADE)
    choice_a = models.CharField(max_length=254, blank=True, null=True)
    choice_b = models.CharField(max_length=254, blank=True, null=True)
    choice_c = models.CharField(max_length=254, blank=True, null=True)
    choice_d = models.CharField(max_length=254, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Choices"


class UserAnswer(models.Model):
    user_id = models.ForeignKey(EUser, on_delete=models.CASCADE)
    word_id = models.ForeignKey(Word, on_delete=models.CASCADE)
    quiz_taken_id = models.ForeignKey(QuizTaken, on_delete=models.CASCADE)
    user_answer = models.CharField(max_length=254)
    is_correct = models.BooleanField()

    class Meta:
        verbose_name_plural = "UserAnswer"


class UserActivityLog(models.Model):
    user_id = models.ForeignKey(EUser, on_delete=models.CASCADE)
    follow_id = models.ForeignKey(
        EUser, on_delete=models.CASCADE, related_name="follow_username", null=True, blank=True
    )
    quiz_taken_id = models.ForeignKey(QuizTaken, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    activity_description = models.CharField(max_length=254)

    class Meta:
        verbose_name_plural = "UserActivityLog"
