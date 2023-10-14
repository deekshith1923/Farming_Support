from rest_framework import viewsets
from .. import models
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


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def Add_Machine_View(request):
    if request.method == 'POST':
        machine_details = MachineInfoSerializers(data=request.data)
        if machine_details.is_valid():
            machine_details.save()
            return JsonResponse({'message': 'Land Details Added successfully'})
        else:
            return JsonResponse({"message": "Insertion Failed"}, status=404)


@api_view(['GET'])
def machine_details(request,admin_id):
    if request.method == 'GET':
        try:
            machine_details = MachineInfo.objects.filter(admin_id=admin_id)
            serializer = MachineInfoSerializers(machine_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        

@api_view(['GET', 'PUT','DELETE'])
def handle_machine_info(request,admin_id,machine_id):
    try:
        machine_details = MachineInfo.objects.get(pk=machine_id,admin_id=admin_id)
        if request.method == 'GET':
            try:
                machine_Info = MachineInfo.objects.filter(pk=machine_id,admin_id=admin_id)
                serializer = MachineInfoSerializers(machine_Info,many=True)
                return Response(serializer.data)
            except:
                return Response(status=404)
            s
        elif request.method == 'PUT':
            serializer = MachineInfoSerializers(machine_details, data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return JsonResponse({"message": "Updation Failed"}, status=404)
        
        elif request.method == 'DELETE':
            machine_delete = get_object_or_404(MachineInfo, id=machine_id)
            machine_delete.delete()
            return JsonResponse({'message': 'Data Deleted successfully'}, status=200)
    except MachineInfo.DoesNotExist:
        return JsonResponse({"message": "MachineInfo not found"}, status=404)
    


@api_view(['GET'])
def machine_image(request, image_path):
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
        
@api_view(['DELETE'])
def delete_multiple_machines(request):
    if request.method == 'DELETE':
        admin_id=request.GET.get("admin_id");
        selected_rows = request.data.get('checkedRows', [])
        try:
            MachineInfo.objects.filter(id__in=selected_rows,admin_id=admin_id).delete()
            return JsonResponse({'message': 'Deletion successfully'})
        except Exception as e:
            return JsonResponse({'message': 'Deletion Failed'})


@api_view(['GET'])
def machine_pending(request):
    if request.method == 'GET':
        try:
            machine_details = MachineRequests.objects.filter(status="Pending")
            serializer = MachineRequestsSerializers(machine_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        
@api_view(['GET'])
def machine_status(request,status):
    if request.method == 'GET':
        try:
            if status == "Pending" or status == "Approved" or status == "Rejected":
                machine_details = MachineRequests.objects.filter(status=status)
                serializer = MachineRequestsSerializers(machine_details,many=True)
                return Response(serializer.data)
            else:
                machine_details = MachineRequests.objects.all()
                serializer = MachineRequestsSerializers(machine_details,many=True)
                return Response(serializer.data)
        except:
            return Response(status=404)
        
@api_view(['PUT'])
def machine_response(request):
    if request.method == 'PUT':
        machine_id=request.data.get('machine_id')
        status=request.data.get('status')
    try:
        item = get_object_or_404(MachineRequests, pk=machine_id)
    except MachineRequests.DoesNotExist:
        return Response('Bad Requests')  
    new_status = status
    item.status = new_status
    item.save()
    return Response({'message': 'successfull'}, status=200)

        
@api_view(['GET'])
def machine_requester_details(request,request_id):
    if request.method == 'GET':
        try:
            machine_request_details = MachineRequests.objects.get(pk=request_id)
            serializer = MachineRequestsSerializers(machine_request_details)
            return Response(serializer.data)
        except:
            return Response(status=404)

        

