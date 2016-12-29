from django.shortcuts import render

from django.http import HttpResponse
#from app_remline.models import Suceso

# Create your views here.

'''def index(request):
    sucesos = Suceso.objects.all()
    stringgg = "Sucesos: <br/>"
    stringgg += '<br/>'.join(["id: %s, nombre:% s"%(s.id, s.nombre) for s in sucesos])
    return HttpResponse(stringgg)'''


'''def suceso_nombre(request, suceso_id):
    suceso = Suceso.objects.get(id=suceso_id)
    return HttpResponse("%s" % suceso.nombre)
'''

def index(request):
    context = {}
    return render(request, 'app_remline/index.html', context)

def modalNuevaHistoria(request):
    context = {}
    return render(request, 'app_remline/modalNuevaHistoria.html', context)

def modalNuevoSuceso(request):
    context = {}
    return render(request, 'app_remline/modalNuevoSuceso.html', context)

def login(request):
    context = {}
    return render(request, 'app_remline/login.html', context)