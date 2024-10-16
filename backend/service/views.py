from django.http import HttpResponse

def hello_world(request):
    return HttpResponse("Hello, World Yuhhhh!")

from django.http import HttpResponse

def homepage(request):
    return HttpResponse("KnowTime")