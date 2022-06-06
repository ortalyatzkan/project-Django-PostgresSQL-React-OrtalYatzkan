# Generated by Django 4.0.4 on 2022-06-02 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeeApp', '0002_formresult_city_alter_formresult_cellular_phone_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExcelFileUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('excel_file_upload', models.FileField(upload_to='excel')),
            ],
        ),
        migrations.AddField(
            model_name='formresult',
            name='Country',
            field=models.CharField(default='', max_length=80),
        ),
    ]
