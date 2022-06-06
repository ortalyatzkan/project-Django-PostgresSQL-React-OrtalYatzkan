from EmployeeApp import views
from django.urls import path




urlpatterns=[
    path('export_excel/',views.export_excel),
    path('SummaryPage/', views.set_data),
    path('SummaryPage', views.set_data),
    path('search/', views.search),
]
  

