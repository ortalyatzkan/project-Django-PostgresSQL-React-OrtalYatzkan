from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

class FormResult(models.Model):
    First_name = models.CharField(max_length=80,default="")
    Last_name = models.CharField(max_length=80,default="")
    Date=models.DateField(default=1/1/1)
    Country=models.CharField(max_length=80,default="")
    City=models.CharField(max_length=80,default="")
    Address=models.CharField(max_length=80,default="")
    Zip_code=models.CharField(max_length=80,default="")
    Land_line=models.CharField(max_length=80,default="")
    Cellular_phone=models.CharField(max_length=80,default="")
    Infected_COVID_19=models.CharField(max_length=1,default="-")
    Bowel_Disease=models.CharField(max_length=1,default="-")
    Cardio_Vascular_Problems=models.CharField(max_length=1,default="-")
    Depression=models.CharField(max_length=1,default="-")
    Diabetes=models.CharField(max_length=1,default="-")
    tuberculosis=models.CharField(max_length=1,default="-")
    other=models.CharField(max_length=100,default="-")

class ExcelFileUpload(models.Model):
    excel_file_upload=models.FileField(upload_to="excel")

class Listing(models.Model):
    city = models.ForeignKey(FormResult, on_delete=models.CASCADE)



    
