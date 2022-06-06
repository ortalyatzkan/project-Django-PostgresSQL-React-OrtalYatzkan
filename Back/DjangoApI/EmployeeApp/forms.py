from django import forms
from django.forms import ModelForm
from EmployeeApp.models import FormResult

class FormResult(ModelForm):
    class Meta:
        model = FormResult     


