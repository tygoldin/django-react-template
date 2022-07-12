from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
import random
import json
import os

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))
# Create your views here.

@api_view(['GET', 'POST'])
def test_get(request):
    if request.method == 'GET':
        return Response(True)

@api_view(['GET', 'POST'])
def random_date_data(request):
    if request.method == 'GET':
        name = request.GET.get('name', '')
        data = []
        for x in range(5):
            data.append(
                {'date': round(random.random() * (1649091210 - 1646412810) + 1646412810),
                 'value': random.random()}
            )
        data.sort(key=lambda x: x['date'])
        series = {'name': name, 'data': data}
        return Response(series)

@api_view(['GET','POST'])
def get_geojson_pipeline(request):
    if request.method == 'GET':
        f = open(os.path.join(__location__, 'NaturalGas_Pipelines_US_202001.geojson'))
#         f = open('NaturalGas_Pipelines_US_202001.geojson')
        data = json.load(f)
        return Response(data)