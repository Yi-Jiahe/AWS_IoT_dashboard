from django.http import HttpResponse


def environmental_data(request):
    return HttpResponse("Hello, world. Here's some environmental data.")
