from rest_framework import serializers

from EmployeeApp.models import FormResult


class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model=FormResult 
        fields=('First_name','Last_name','Date','Address','City','Zip_code','Land_line','Cellular_phone','Infected_COVID_19',
      'Bowel_Disease','Cardio_Vascular_Problems','Depression','Diabetes',
        'tuberculosis','other')
        
       