from django.urls import path

from . import views

urlpatterns = [
    path('environmental', views.environmental_data, name='environmental_data'),
]
