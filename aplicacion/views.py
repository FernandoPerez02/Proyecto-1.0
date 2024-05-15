from django.shortcuts import render

# Create your views here.
def inicio(request):
    return render(request, 'inicio.html')

def config(request):
    return render(request, 'config.html')

def administrador(request):
    return render(request, 'admi.html')

def login(request):
    return render(request, 'in_ses.html')

def contraseña(request):
    return render(request, 'index_contraseña.html')

def mas(request):
    return render(request, 'index_mas.html')

def quimico(request):
    return render(request, 'index_qui.html')

def base(request):
    return render(request, 'base.html')

def her(request):
    return render(request, 'herramientas.html')

def prueba(request):
    return render(request, 'pruebas.html')