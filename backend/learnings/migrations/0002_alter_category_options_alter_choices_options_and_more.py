# Generated by Django 4.1.2 on 2022-10-05 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learnings', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'Category'},
        ),
        migrations.AlterModelOptions(
            name='choices',
            options={'verbose_name_plural': 'Choices'},
        ),
        migrations.AlterModelOptions(
            name='euser',
            options={'verbose_name_plural': 'EUser'},
        ),
        migrations.AlterModelOptions(
            name='follow',
            options={'verbose_name_plural': 'Follow'},
        ),
        migrations.AlterModelOptions(
            name='quiztaken',
            options={'verbose_name_plural': 'QuizTaken'},
        ),
        migrations.AlterModelOptions(
            name='useranswer',
            options={'verbose_name_plural': 'UserAnswer'},
        ),
        migrations.AlterModelOptions(
            name='word',
            options={'verbose_name_plural': 'Word'},
        ),
        migrations.AlterField(
            model_name='category',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='choices',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='euser',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='follow',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='quiztaken',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='useranswer',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='word',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]