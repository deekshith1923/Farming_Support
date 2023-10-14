from django.db import models
from datetime import datetime
from django.core.validators import RegexValidator

class Register(models.Model):
    id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100,unique=True)
    phone = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=100)
    ROLE=(
        ('Admin','Admin'),
        ('Farmer', 'Farmer') ,('Customer' ,'Customer'))
    role=models.CharField(choices=ROLE,default='Admin', max_length=30)

    def __str__(self):
        return self.name

class LandInfo(models.Model):
    id=models.AutoField(primary_key=True)
    farmer_id = models.ForeignKey(Register,on_delete=models.CASCADE)
    farmer_name = models.CharField(max_length=50)
    mobile = models.TextField(max_length=50)
    address=models.CharField(max_length=50)
    date=models.DateTimeField(auto_now_add=True)
    rent=models.IntegerField()
    others=models.CharField(max_length=255)
    image=models.ImageField(null=True,blank=True,upload_to="Images/Farmer/Lands")

    def __str__(self):
        return self.farmer_name

class VegetablesInfo(models.Model):
    id=models.AutoField(primary_key=True)
    farmer_id = models.ForeignKey(Register,on_delete=models.CASCADE)
    farmer_name = models.CharField(max_length=50)
    mobile = models.TextField(max_length=50)
    address=models.CharField(max_length=50)
    vegetable_name=models.CharField(max_length=50)
    quantity=models.IntegerField()
    cost=models.IntegerField()
    date=models.DateTimeField(auto_now_add=True)
    image=models.ImageField(null=True,blank=True,upload_to="Images/Farmer/Vegetables")

    def __str__(self):
        return self.farmer_name
    
class MachineInfo(models.Model):
    id=models.AutoField(primary_key=True)
    admin_id = models.ForeignKey(Register,on_delete=models.CASCADE)
    owner_name = models.CharField(max_length=50)
    machine_name = models.CharField(max_length=50)
    details=models.CharField(max_length=255)
    mobile = models.TextField(max_length=50)
    owner_address=models.CharField(max_length=50)
    date=models.DateTimeField(auto_now_add=True)
    rent=models.CharField(max_length=255)
    image=models.ImageField(null=True,blank=True,upload_to="Images/Admin/Machines")

    def __str__(self):
        return self.owner_name
     
class LandRequests(models.Model):
    id=models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Register,on_delete=models.CASCADE)
    land_id = models.ForeignKey(LandInfo,on_delete=models.CASCADE)
    farmer_id=models.ForeignKey(Register,on_delete=models.CASCADE,related_name='requested_land')
    user_name = models.CharField(max_length=50)
    mobile = models.TextField(max_length=50)
    address=models.CharField(max_length=50)
    start_date=models.DateTimeField(auto_now_add=True)
    end_date=models.DateTimeField(auto_now_add=True)
    cost=models.CharField(max_length=50)
    date=models.DateTimeField(auto_now_add=True)
    APPROVAL_STATUS=(
        ('Pending','Pending'),
        ('Approved', 'Approved') ,('Rejected' ,'Rejected'))
    status=models.CharField(choices=APPROVAL_STATUS,default='Pending', max_length=30)

    def __str__(self):
        return self.user_name

class VegetablesRequests(models.Model):
    id=models.AutoField(primary_key=True)
    requester_id = models.ForeignKey(Register,on_delete=models.CASCADE)
    vegetables_id = models.ForeignKey(VegetablesInfo,on_delete=models.CASCADE)
    farmer_id=models.ForeignKey(Register,on_delete=models.CASCADE,related_name='requested_vegetables')
    requester_name = models.CharField(max_length=50)
    mobile = models.TextField(max_length=50)
    quantity=models.IntegerField()
    address=models.CharField(max_length=50)
    request_date=models.DateTimeField(auto_now_add=True)
    APPROVAL_STATUS=(
        ('Pending','Pending'),
        ('Approved', 'Approved') ,('Rejected' ,'Rejected'))
    status=models.CharField(choices=APPROVAL_STATUS,default='Pending', max_length=30)

    def __str__(self):
        return self.requester_name
    
class MachineRequests(models.Model):
    id=models.AutoField(primary_key=True)
    farmer_id = models.ForeignKey(Register,on_delete=models.CASCADE)
    machine_id = models.ForeignKey(MachineInfo,on_delete=models.CASCADE)
    admin_id=models.ForeignKey(Register,on_delete=models.CASCADE,related_name='requested_machine')
    farmer_name = models.CharField(max_length=50)
    mobile = models.TextField(max_length=50)
    address=models.CharField(max_length=50)
    date=models.DateTimeField(auto_now_add=True)
    rent=models.CharField(max_length=50)
    APPROVAL_STATUS=(
        ('Pending','Pending'),
        ('Approved', 'Approved') ,('Rejected' ,'Rejected'))
    status=models.CharField(choices=APPROVAL_STATUS,default='Pending', max_length=30)

    def __str__(self):
        return self.farmer_name
    
class Contactus(models.Model):
    id=models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100,unique=True)
    phone = models.CharField(max_length=100,unique=True)
    message = models.CharField(max_length=100)
   
    def __str__(self):
        return self.first_name







