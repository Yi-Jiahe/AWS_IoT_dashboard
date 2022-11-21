from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def environmental_data(request):
    return Response([{
        'timestamp': 1234,
        'temperature': 24.0,
        'humidity': 50.0,
    }])
