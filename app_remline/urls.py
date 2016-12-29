from django.conf.urls import url

from . import views

urlpatterns = [
    # /remline/
    url(r'^$', views.index, name='index'),
    # /remline/modalNuevaHistoria
    url(r'modalNuevaHistoria', views.modalNuevaHistoria, name='modalNuevaHistoria'),
    # /remline/modalNuevoSuceso
    url(r'modalNuevoSuceso', views.modalNuevoSuceso, name='modalNuevoSuceso'),
    # /remline/login
    url(r'login', views.login, name='login'),
]