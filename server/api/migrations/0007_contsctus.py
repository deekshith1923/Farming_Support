# Generated by Django 4.2.1 on 2023-09-24 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_vegetablesrequests_quantity'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contsctus',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100, unique=True)),
                ('phone', models.CharField(max_length=100, unique=True)),
                ('message', models.CharField(max_length=100)),
            ],
        ),
    ]
