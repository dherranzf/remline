from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from app_api_rest.serializers import SucesoSerializer, HistoriaSerializer
from app_api_rest.models import Suceso, Historia

# Create your views here.

#-----SUCESOS------

@api_view(['GET', 'POST'])
def sucesos_list(request, format=None):
    if request.method == 'GET':
        sucesos = Suceso.objects.all()
        serializer = SucesoSerializer(sucesos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SucesoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def sucesos_detail(request, pk, format=None):

    if request.method == 'GET':
        try:
            historia = Historia.objects.get(id=pk)
        except Historia.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        sucesos = Suceso.objects.filter(historia=pk)
        serializer = SucesoSerializer(sucesos, many=True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        try:
            suceso = Suceso.objects.get(pk=pk)
        except Suceso.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = SucesoSerializer(suceso, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            suceso = Suceso.objects.get(pk=pk)
        except Suceso.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        suceso.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#================================================================================================


#-----HISTORIAS------

@api_view(['GET', 'POST'])
def historias_list(request, format=None):
    if request.method == 'GET':
        historias = Historia.objects.all()
        serializer = HistoriaSerializer(historias, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = HistoriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def historias_detail(request, pk, format=None):

    try:
        historia = Historia.objects.get(id=pk)
    except Historia.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HistoriaSerializer(historia)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = HistoriaSerializer(historia, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        historia.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)