# Generated by Django 4.2 on 2023-05-07 13:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('truckMateApp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='driver',
            old_name='end_date',
            new_name='ending_date',
        ),
    ]