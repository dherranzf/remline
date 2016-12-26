from app_api_rest.models import Suceso, Historia
from rest_framework.serializers import ModelSerializer


class SucesoSerializer(ModelSerializer):
    class Meta:
        model = Suceso
        fields = ('id', 'nombre', 'descripcion', 'fecha', 'tipo', 'coste', 'media', 'historia')

class HistoriaSerializer(ModelSerializer):
    class Meta:
        model = Historia
        fields = ('id', 'nombre', 'descripcion')
