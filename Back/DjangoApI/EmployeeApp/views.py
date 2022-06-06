from rest_framework.decorators import api_view
from EmployeeApp.models import FormResult
from django.core import serializers
import json
from django.http import HttpResponse
import datetime
from EmployeeApp.serializers import FormSerializer
import xlwt
from django.db.models import Q


@api_view(['POST','GET'])
def set_data(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        p = FormResult(
        First_name=body['first_name'],
        Last_name=body['last_name'],
        Date=body['date'],
        Country=body['Country'],
        City=body['city'],
        Address=body['address'],
        Zip_code=body['zip_code'],
        Land_line=body['land_line'],
        Cellular_phone=body['cellular_phone'],
        Infected_COVID_19=body['infected_Covid_19'],
        Bowel_Disease=body['Bowel Disease'],
        Cardio_Vascular_Problems=body['Cardio-Vascular problems'],
        Depression=body['Depression'],
        Diabetes=body['Diabetes'],
        tuberculosis=body['Tuberculosis'],
        other=body['other'])
        p.save()

        json_data =  serializers.serialize('json',FormResult.objects.all())
        return HttpResponse(json_data, content_type='application/json')
    if request.method == 'GET':
        json_data =  serializers.serialize('json',FormResult.objects.all())
        return HttpResponse(json_data, content_type='application/json')


@api_view(['GET'])
def export_excel(request):
    if request.method == 'GET':
        response=HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition']='attachment; filename=Expenses'+str(datetime.datetime.now())+'.xls'
        wb=xlwt.Workbook(encoding='utf-8')
        ws=wb.add_sheet('Expenses')
        row_num=0
        font_style=xlwt.XFStyle()
        font_style.font.bold=True
        columns=['First Name','Last Name','Date','Address','City','Country','Zip code','Land line','Cellular phone','Covid-19 infected',
       'Diabetes','Cardio-Vascular problems','Tuberculosis','Bowel Disease','Depression','other'];

        for col_num in range(len(columns)):
            ws.write(row_num,col_num,columns[col_num],font_style)

        font_style=xlwt.XFStyle()
        rows=FormResult.objects.values_list('First_name','Last_name','Date','Address','City','Country','Zip_code','Land_line','Cellular_phone','Infected_COVID_19',
        'Bowel_Disease','Cardio_Vascular_Problems','Diabetes','tuberculosis','other')
        
        for row in rows:
            row_num += 1
    
            for col_num in range(len(row)):
                ws.write(row_num,col_num,str(row[col_num]),font_style)

        wb.save(response)

        return response


@api_view(['GET','POST'])
def search(request):
    if request.method == 'GET':
        json_data =  serializers.serialize('json',FormResult.objects.all())
        return HttpResponse(results, content_type='application/json')
    
    if request.method == 'POST':
        print(FormSerializer.fields)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        
        if(len(body['body'][1])==0 and (len(body['body'][3])==0 or len(body['body'][4])==0) ):
                json_data =  serializers.serialize('json',FormResult.objects.all())
                return HttpResponse(json_data, content_type='application/json')
        
        if(len(body['body'][1])!=0):
            results = serializers.serialize('json',FormResult.objects.filter(Q(City__icontains=body['body'][1])))
            return HttpResponse(results, content_type='application/json')
        
        if(len(body['body'][3])!=0 and len(body['body'][4])!=0):
            results = serializers.serialize('json',FormResult.objects.filter(Q(Date__range=[body['body'][3], body['body'][4]]) ))
            return HttpResponse(results, content_type='application/json')
        

















