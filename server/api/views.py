from rest_framework import viewsets
from .models import *
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from mimetypes import guess_type
from django.conf import settings
from django.shortcuts import get_object_or_404
import os

@api_view(['POST'])
def RegisterView(request):
    if request.method == 'POST':
        data = RegisterSerializer(data=request.data)
        if data.is_valid():
            data.save()
            return JsonResponse({'message': 'Registration Successfull'})
        return JsonResponse({'errors': RegisterSerializer.errors})
    

@api_view(['POST'])
def LoginView(request):
    if request.method == 'POST':
        email=request.data.get('email')
        password=request.data.get('password')
        try:
            user = Register.objects.get(email=email, password=password)
            serializer = RegisterSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=404)
        
@api_view(['POST'])
def ContactusView(request):
    if request.method == 'POST':
        data = ContactusSerializer(data=request.data)
        if data.is_valid():
            data.save()
            return JsonResponse({'message': 'Registration Successfull'})
        return JsonResponse({'errors': ContactusSerializer.errors})
        
        
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def Add_Land_View(request):
    if request.method == 'POST':
        land_details = LandInfoSerializers(data=request.data,partial=True)
        if land_details.is_valid():
            land_details.save()
            return JsonResponse({'message': 'Land Details Added successfully'})
        else:
            return JsonResponse({"message": "Insertion Failed"}, status=404)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def Add_Vegetables_View(request):
    if request.method == 'POST':
        vegetables_details = VegetablesInfoSerializers(data=request.data,partial=True)
        if vegetables_details.is_valid():
            vegetables_details.save()
            return JsonResponse({'message': 'Vegetables Details Added successfully'})
        else:
            return JsonResponse({"message": "Vegetables Insertion Failed"}, status=404)
    
@api_view(['GET'])
def land_details(request,farmer_id):
    if request.method == 'GET':
        try:
            land_details = LandInfo.objects.filter(farmer_id=farmer_id)
            serializer = LandInfoSerializers(land_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)

    
@api_view(['GET'])
def vegetables_details(request,farmer_id):
    if request.method == 'GET':
        try:
            vegetables_details = VegetablesInfo.objects.filter(farmer_id=farmer_id)
            serializer = VegetablesInfoSerializers(vegetables_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        
        
@api_view(['GET', 'PUT','DELETE'])
def handle_land_details(request, farmer_id,lands_id):
    try:
        land_info = LandInfo.objects.get(pk=lands_id,farmer_id=farmer_id)
        if request.method == 'GET':
            try:
                land_details = LandInfo.objects.filter(pk=lands_id,farmer_id=farmer_id)
                serializer = LandInfoSerializers(land_details,many=True)
                return Response(serializer.data)
            except:
                return JsonResponse({"message": "No Data"}, status=404)
        
        elif request.method == 'PUT':
            print(request.data)
            serializer = LandInfoSerializers(land_info,data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return JsonResponse({"message": "Updation Failed"}, status=404)
        
        elif request.method == 'DELETE':
            land_delete = get_object_or_404(LandInfo, id=lands_id)
            land_delete.delete()
            return JsonResponse({'message': 'Data Deleted successfully'}, status=200)
        
    except LandInfo.DoesNotExist:
        return JsonResponse({"message": "User Not Valid"}, status=404)
    

@api_view(['GET', 'PUT','DELETE'])
def handle_vegetables_details(request, farmer_id,vegetables_id):
    try:
        vegetables_info = VegetablesInfo.objects.get(pk=vegetables_id,farmer_id=farmer_id)
        if request.method == 'GET':
            try:
                vegetables_details = VegetablesInfo.objects.filter(pk=vegetables_id,farmer_id=farmer_id)
                serializer = VegetablesInfoSerializers(vegetables_details,many=True)
                return Response(serializer.data)
            except:
                return JsonResponse({"message": "No Data"}, status=404)
        
        elif request.method == 'PUT':
            serializer = VegetablesInfoSerializers(vegetables_info,data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return JsonResponse({"message": "Updation Failed"}, status=404)
        
        elif request.method == 'DELETE':
            veg_delete = get_object_or_404(VegetablesInfo, id=vegetables_id)
            veg_delete.delete()
            return JsonResponse({'message': 'Data Deleted successfully'}, status=200)
        
    except VegetablesInfo.DoesNotExist:
        return JsonResponse({"message": "User Not Valid"}, status=404)
    
     
@api_view(['DELETE'])
def delete_multiple_lands(request):
    if request.method == 'DELETE':
        farmer_id=request.GET.get("farmer_id");
        selected_rows = request.data.get('checkedRows', [])
        try:
            LandInfo.objects.filter(id__in=selected_rows,farmer_id=farmer_id).delete()
            return JsonResponse({'message': 'Deletion successfully'})
        except Exception as e:
            return JsonResponse({'message': 'Deletion Failed'})
           

@api_view(['DELETE'])
def delete_multiple_vegetables(request):
    if request.method == 'DELETE':
        farmer_id=request.GET.get("farmer_id");
        selected_rows = request.data.get('checkedRows', [])
        try:
            VegetablesInfo.objects.filter(id__in=selected_rows,farmer_id=farmer_id).delete()
            return JsonResponse({'message': 'Deletion successfully'})
        except Exception as e:
            return JsonResponse({'message': 'Deletion Failed'})


@api_view(['GET'])
def land_pending(request):
    if request.method == 'GET':
        try:
            land_details = LandRequests.objects.filter(status="Pending")
            serializer = LandRequestsSerializers(land_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        

@api_view(['GET'])
def land_status(request,status):
    if request.method == 'GET':
        try:
            if status == "Pending" or status == "Approved" or status == "Rejected":
                land_details = LandRequests.objects.filter(status=status)
                serializer = LandRequestsSerializers(land_details,many=True)
                return Response(serializer.data)
            else:
                land_details = LandRequests.objects.all()
                serializer = LandRequestsSerializers(land_details,many=True)
                return Response(serializer.data)
        except:
            return Response(status=404)
        
@api_view(['PUT'])
def land_response(request):
    if request.method == 'PUT':
        land_id=request.data.get('land_id')
        status=request.data.get('status')
    try:
        item = get_object_or_404(LandRequests, pk=land_id)
    except LandRequests.DoesNotExist:
        return Response('Bad Requests')  
    new_status = status
    item.status = new_status
    item.save()
    return Response({'message': 'successfull'}, status=200)


@api_view(['GET'])
def get_machine_info(request):
    if request.method == 'GET':
        try:
            land_details = MachineInfo.objects.all()
            serializer = MachineInfoSerializers(land_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        

# waste Try Later 
@api_view(['GET'])   
def get_machine_info_sort(request,sort_by):
    sort_b=str(sort_by)
    try:
        machine_details = LandInfo.objects.all().order_by(f'{sort_b}').values()
        serializer = LandInfoSerializers(machine_details,many=True)
        print(serializer.data)
        return Response({'message': 'Data Deleted successfully'}, status=200)
    except:
        return Response(status=404)

@api_view(['POST'])
def Machine_Requests_View(request):
    if request.method == 'POST':
        machine_id=request.data.get('machine_id')
        machines = get_object_or_404(MachineInfo, pk=machine_id)
        mutable_data = request.data.copy()
        mutable_data['admin_id'] = machines.admin_id.id
        user_details = MachineRequestsSerializers(data=mutable_data)
        if user_details.is_valid():
            user_details.save()
            return JsonResponse({'message': 'Machine Requests successfully'})
        else:
            return JsonResponse({"message": "Requests Failed"}, status=404)
        
@api_view(['GET'])
def machine_requested(request,farmer_id):
    print(farmer_id)
    if request.method == 'GET':
        try:
            machine_details = MachineRequests.objects.filter(farmer_id=farmer_id)
            serializer = MachineRequestsSerializers(machine_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)
        

@api_view(['GET'])        
def requested_each_machine_status(request,machine_id):
        try:
            machine_requests = get_object_or_404(MachineRequests, id=machine_id)
            machine_info = machine_requests.machine_id

            machine_requests_details = MachineRequestsSerializers(machine_requests)
            machine_details = MachineInfoSerializers(machine_info)
            response_data = {
                'request_details': machine_requests_details.data,
                'machine_details': machine_details.data
            }
            return Response(response_data)
        except Exception as e:
            return Response({'error': str(e)}, status=404)
        
    
@api_view(['DELETE'])
def delete_machine_request(request):
    if request.method == 'DELETE':
        farmer_id=request.GET.get("farmer_id");
        selected_rows = request.data.get('checkedRows', [])
        try:
            MachineRequests.objects.filter(id__in=selected_rows,farmer_id=farmer_id).delete()
            return JsonResponse({'message': 'Deletion successfully'})
        except Exception as e:
            return JsonResponse({'message': 'Deletion Failed'})
       

@api_view(['GET'])
def Vegetables_pending(request):
    if request.method == 'GET':
        try:
            vegetables_details = VegetablesRequests.objects.filter(status="Pending")
            serializer = VegetablesRequestsSerializers(vegetables_details,many=True)
            return Response(serializer.data)
        except:
            return Response(status=404)

@api_view(['GET'])
def Vegetables_status(request,status):
    if request.method == 'GET':
        try:
            if status == "Pending" or status == "Approved" or status == "Rejected":
                vegetables_details = VegetablesRequests.objects.filter(status=status)
                serializer = VegetablesRequestsSerializers(vegetables_details,many=True)
                return Response(serializer.data)
            else:
                vegetables_details = VegetablesRequests.objects.all()
                serializer = VegetablesRequestsSerializers(vegetables_details,many=True)
                return Response(serializer.data)
        except:
            return Response(status=404)
        
@api_view(['PUT'])
def Vegetables_response(request):
    if request.method == 'PUT':
        request_id=request.data.get('request_id')
        vegetables_id=request.data.get('vegetables_id')
        status=request.data.get('status')
        requested_quantity=int(request.data.get('req_quantity'))
    try:
        item = get_object_or_404(VegetablesRequests, pk=request_id)
        vegetable = VegetablesInfo.objects.get(pk=vegetables_id)
    except VegetablesRequests.DoesNotExist:
        return Response('Bad Requests')  
    new_status = status
    item.status = new_status
    if status=="Approved":
        vegetable.quantity-=requested_quantity
        vegetable.save()
        item.save()
        return Response({'message': 'successfull'}, status=200)
    else:
        item.save()
        return Response({'message': 'successfull'}, status=200)



@api_view(['GET'])
def land_requester_details(request,request_id):
    if request.method == 'GET':
        try:
            land_request_details = LandRequests.objects.get(pk=request_id)
            serializer = LandRequestsSerializers(land_request_details)
            return Response(serializer.data)
        except:
            return Response(status=404)
        
@api_view(['GET'])
def vegetables_requester_details(request,request_id):
    if request.method == 'GET':
        try:
            vegetables_request_details = VegetablesRequests.objects.get(pk=request_id)
            serializer = VegetablesRequestsSerializers(vegetables_request_details)
            return Response(serializer.data)
        except:
            return Response(status=404)


