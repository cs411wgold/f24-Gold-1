# Generated by Django 5.1.2 on 2024-11-20 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='usermessages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sent_by', models.CharField(max_length=255)),
                ('sent_to', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('sent_at', models.DateTimeField()),
            ],
        ),
    ]
