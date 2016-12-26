from django.contrib import admin
from app_api_rest.models import Suceso, Historia

# Register your models here.

class HistoriasAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion')

admin.site.register(Historia, HistoriasAdmin)

class SucesosAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion', 'fecha', 'tipo', 'historia_nombre')

admin.site.register(Suceso, SucesosAdmin)


