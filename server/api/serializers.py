from .models import *
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = '__all__'

class LandInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model=LandInfo
        fields="__all__"

class MachineInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model=MachineInfo
        fields="__all__"

class VegetablesInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model=VegetablesInfo
        fields="__all__"

class LandRequestsSerializers(serializers.ModelSerializer):
    class Meta:
        model=LandRequests
        fields="__all__"

class VegetablesRequestsSerializers(serializers.ModelSerializer):
    class Meta:
        model=VegetablesRequests
        fields="__all__"

class MachineRequestsSerializers(serializers.ModelSerializer):
    class Meta:
        model=MachineRequests
        fields="__all__"

class ContactusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contactus
        fields = '__all__'

