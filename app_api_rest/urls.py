

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
#from app_api_rest.views import SucesoViewset
from rest_framework.urlpatterns import format_suffix_patterns


from . import views

urlpatterns = [
    url(r'^sucesos/$', views.sucesos_list),
    url(r'^sucesos/(?P<pk>[0-9]+)$', views.sucesos_detail),
    url(r'^historias/$', views.historias_list),
    url(r'^historias/(?P<pk>[0-9]+)$', views.historias_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)