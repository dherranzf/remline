from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Historia(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    propietario = models.ForeignKey(User)

    def _unicode_(self):
        return self.nombre


class Suceso(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha = models.DateTimeField()
    tipo = models.CharField(max_length=100)
    coste = models.TextField()
    media = models.TextField()
    historia = models.ForeignKey(Historia,default='1')

    def _unicode_(self):
        return self.nombre

    def historia_nombre(self):
        return self.historia.nombre


