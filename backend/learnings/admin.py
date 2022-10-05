from django.contrib import admin

from .models import Category, Choices, EUser, Follow, QuizTaken, UserAnswer, Word

admin.site.register(Category)
admin.site.register(Choices)
admin.site.register(EUser)
admin.site.register(Follow)
admin.site.register(QuizTaken)
admin.site.register(UserAnswer)
admin.site.register(Word)