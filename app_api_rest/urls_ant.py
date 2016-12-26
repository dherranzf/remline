

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
#from app_api_rest.views import SucesoViewset
from rest_framework.urlpatterns import format_suffix_patterns


from . import views
'''
router = DefaultRouter()
router.register(r'sucesos',SucesoViewset)

urlpatterns = [
    # /rest/
    #url(r'^/$', views.sucesos, name='sucesos'),
    url(r'^', include(router.urls), name='sucesos'),
]
'''
# INFO API REST con router
#
# sucesos/ => GET,POST (listar,crear)
# sucesos/(lookup-id) => GET,PUT,PATCH,DELETE (obtener objeto, modificar, borrar)
# sucesos/[.format] (.xml .json ...)
#


urlpatterns = [
    url(r'^sucesos/$', views.sucesos_list),
    url(r'^sucesos/(?P<pk>[0-9]+)$', views.sucesos_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)