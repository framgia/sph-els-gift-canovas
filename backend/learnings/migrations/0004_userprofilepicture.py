# Generated by Django 4.1.2 on 2022-11-11 07:23

from django.db import migrations, models
import django.db.models.deletion
import learnings.models


class Migration(migrations.Migration):

    dependencies = [
        ("learnings", "0003_useractivitylog"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserProfilePicture",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=32)),
                (
                    "picture",
                    models.ImageField(
                        blank=True, null=True, upload_to=learnings.models.upload_path
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="learnings.euser",
                    ),
                ),
            ],
        ),
    ]
