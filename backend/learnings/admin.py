from django.contrib import admin
from .models import EUser, Follow, Category, QuizTaken, Word, Choices, UserAnswer
admin.site.register(EUser)
admin.site.register(Follow)
admin.site.register(Category)
admin.site.register(QuizTaken)
admin.site.register(Word)
admin.site.register(Choices)
admin.site.register(UserAnswer)
