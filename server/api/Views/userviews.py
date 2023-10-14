from rest_framework import viewsets
from ..models import *
from rest_framework.response import Response
from ..serializers import *
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from mimetypes import guess_type
from django.conf import settings
import os
from django.shortcuts import get_object_or_404


# Lands
@api_view(['GET'])
def get_available_lands(request):
    if request.method == 'GET':
        try:
            land_details = LandInfo.objects.all()
            serializer = LandInfoSerializers(land_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        
@api_view(['GET'])
def get_single_land_info(request,land_id):
    if request.method == 'GET':
        try:
            lands_details = LandInfo.objects.filter(id=land_id)
            serializer = LandInfoSerializers(lands_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)


@api_view(['GET'])
def lands_image(request, image_path):
    if request.method == 'GET':
        try:
            image_full_path = os.path.join(settings.MEDIA_ROOT,image_path)
            with open(image_full_path, 'rb') as image_file:
                content_type, _ = guess_type(image_full_path)
                response = HttpResponse(image_file.read(), content_type=content_type)
                response['Content-Disposition'] = f'inline; filename={os.path.basename(image_full_path)}'
                return response
        except:
            return Response(status=404)


@api_view(['POST'])
def Add_Land_View(request):
    if request.method == 'POST':
        land_id=request.data.get('land_id')
        land = get_object_or_404(LandInfo, pk=land_id)
        mutable_data = request.data.copy()
        mutable_data['farmer_id'] = land.farmer_id.id
        land_requests = LandRequestsSerializers(data=mutable_data)
        if land_requests.is_valid():
            land_requests.save()
            return JsonResponse({'message': 'Land Requests successfully'})
        else:
            return JsonResponse({"message": "Requests Failed"}, status=404)


@api_view(['GET'])
def requested_land_status(request,customer_id):
    if request.method == 'GET':
        try:
            lands_details = LandRequests.objects.filter(user_id=customer_id)
            serializer = LandRequestsSerializers(lands_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        
@api_view(['GET'])        
def requested_each_land_status(request,request_id):
        try:
            land_requests = get_object_or_404(LandRequests, id=request_id)
            land_info = land_requests.land_id

            land_requests_details = LandRequestsSerializers(land_requests)
            land_details = LandInfoSerializers(land_info)
            response_data = {
                'request_details': land_requests_details.data,
                'land_details': land_details.data
            }
            return Response(response_data)
        except Exception as e:
            return Response({'error': str(e)}, status=404)
        
# Vegetables
@api_view(['GET'])
def get_available_vegetables(request):
    if request.method == 'GET':
        try:
            vegetables_details = VegetablesInfo.objects.all()
            serializer = VegetablesInfoSerializers(vegetables_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)

@api_view(['GET'])
def get_single_vegetables_info(request,veg_id):
    if request.method == 'GET':
        try:
            vegetables_details = VegetablesInfo.objects.filter(id=veg_id)
            serializer = VegetablesInfoSerializers(vegetables_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        
@api_view(['GET'])
def vegetables_image(request, image_path):
    if request.method == 'GET':
        try:
            image_full_path = os.path.join(settings.MEDIA_ROOT,image_path)
            with open(image_full_path, 'rb') as image_file:
                content_type, _ = guess_type(image_full_path)
                response = HttpResponse(image_file.read(), content_type=content_type)
                response['Content-Disposition'] = f'inline; filename={os.path.basename(image_full_path)}'
                return response
        except:
            return Response(status=404)


@api_view(['POST'])
def Add_Vegetables_View(request):
    if request.method == 'POST':
        vegetables_id=request.data.get('vegetables_id')
        vegetables = get_object_or_404(VegetablesInfo, pk=vegetables_id)
        mutable_data = request.data.copy()
        mutable_data['farmer_id'] = vegetables.farmer_id.id
        vegetables_details = VegetablesRequestsSerializers(data=mutable_data)
        if vegetables_details.is_valid():
            vegetables_details.save()
            return JsonResponse({'message': 'vegetables Requests successfully'})
        else:
            return JsonResponse({"message": "vegetables Requests Failed"}, status=404)

@api_view(['GET'])
def requested_vegetables_status(request,customer_id):
    if request.method == 'GET':
        try:
            vegetables_details = VegetablesRequests.objects.filter(requester_id=customer_id)
            serializer = VegetablesRequestsSerializers(vegetables_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)

@api_view(['GET'])        
def requested_each_vegetables_status(request,veg_id):
        try:
            veg_requests = get_object_or_404(VegetablesRequests, id=veg_id)
            veg_info = veg_requests.vegetables_id

            veg_requests_details = VegetablesRequestsSerializers(veg_requests)
            veg_details = VegetablesInfoSerializers(veg_info)
            response_data = {
                'request_details': veg_requests_details.data,
                'vegetables_details': veg_details.data
            }
            return Response(response_data)
        except Exception as e:
            return Response({'error': str(e)}, status=4)
        
@api_view(['DELETE'])
def delete_lands_requested(request):
    if request.method == 'DELETE':
        selected_rows = request.data.get('checkedRows', [])
        try:
            LandRequests.objects.filter(id__in=selected_rows).delete()
            return JsonResponse({'message': 'Deletion successfully'})
        except Exception as e:
            return JsonResponse({'message': 'Deletion Failed'})
        

@api_view(['DELETE'])
def delete_vegetables_requested(request):
    if request.method == 'DELETE':
        selected_rows = request.data.get('checkedRows', [])
        try:
            VegetablesRequests.objects.filter(id__in=selected_rows).delete()
            return JsonResponse({'message': 'Deletion successfully'})
        except Exception as e:
            return JsonResponse({'message': 'Deletion Failed'})
        
@api_view(['GET'])
def get_land_approved(request,user_id):
    if request.method == 'GET':
        try:
            land_details = LandRequests.objects.filter(status="Approved",user_id=user_id)
            serializer = LandRequestsSerializers(land_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        
@api_view(['GET'])
def get_vegetables_approved(request,user_id):
    if request.method == 'GET':
        try:
            veg_details = VegetablesRequests.objects.filter(status="Approved",requester_id=user_id)
            serializer = VegetablesRequestsSerializers(veg_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)





