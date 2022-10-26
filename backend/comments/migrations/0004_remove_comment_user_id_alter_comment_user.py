# Generated by Django 4.0.4 on 2022-10-26 15:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('comments', '0003_alter_comment_user_alter_comment_user_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='user_id',
        ),
        migrations.AlterField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(default=0, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
