# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-13 14:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Historia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Suceso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField()),
                ('fecha', models.DateTimeField()),
                ('tipo', models.CharField(max_length=100)),
                ('coste', models.TextField()),
                ('media', models.TextField()),
                ('historia', models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='app_api_rest.Historia')),
            ],
        ),
    ]