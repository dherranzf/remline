from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from app_api_rest.serializers import SucesoSerializer
from app_api_rest.models import Suceso, Historia


class SucesoViewset(viewsets.ModelViewSet):
    serializer_class = SucesoSerializer
    queryset = Suceso.objects.all()
    lookup_field = 'id'

    @link()
    def votes(self, request, *args, **kwargs):
        survey = self.get_object()
        votes = survey.survey_votes.all()
        serializer = SurveyVotesSerializer(votes)
        return Response(serializer.data)


#sucesos_list = SucesoViewset.as_view({'get':'list'})
#sucesos_detail = SucesoViewset.as_view({'get':'retrieve'})