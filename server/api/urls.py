from django.urls import path
from . import views
from .Views.adminviews import *
from .Views.userviews import *
import os

urlpatterns = [
    path('register/', views.RegisterView, name='User Registration'),
    path('login/', views.LoginView, name='User Login'),
    path('contactus/', views.ContactusView, name='ContactusView'),

# -----------------------------------------------------------------------------------------------#
                                        # Farmer View    

    # Land Details View
    path('addland/', views.Add_Land_View, name='Add Land Details'),
    path('land_details/<int:farmer_id>/', views.land_details, name='Get Land Details By Id'),
    path('handle_land/<int:farmer_id>/<int:lands_id>/', views.handle_land_details, name='Handle Land Information'),
    path('delete_lands_details', views.delete_multiple_lands, name='Delete Multiple Lands Information'),
    path('land_pending/', views.land_pending, name='Pending Land Requests For Counting'),
    path('land_status/<str:status>', views.land_status, name='Land Requests With Status'),
    path('land_response/', views.land_response, name='Response For Customers Land Requests'),
    path('land_response/', views.land_response, name='Response For Customers Land Requests'),
    path('land_requester_details/<int:request_id>/', views.land_requester_details, name='Each Land Requester Details'),

    # Vegetables Details View
    path('add_vegetables/', views.Add_Vegetables_View, name='Add Vegetables Details'),
    path('vegetables_details/<int:farmer_id>/', views.vegetables_details, name='Get Vegetables Details By Id'),
    path('handle_vegetables/<int:farmer_id>/<int:vegetables_id>/', views.handle_vegetables_details, name='Update Vegetables Information'),
    path('delete_vegetables_details', views.delete_multiple_vegetables, name='Delete Multiple Vegetables Information'),
    path('vegetables_pending/', views.Vegetables_pending, name='Pending Vegetables Requests For Counting'),
    path('vegetables_status/<str:status>', views.Vegetables_status, name='Vegetables Requests With Status'),
    path('vegetables_response/', views.Vegetables_response, name='Response For Customers Vegetables Requests'),
    path('vegetables_requester_details/<int:request_id>/', views.vegetables_requester_details, name='Each Vegetables Requester Details'),

    # Machine Requests View
    path('get_machines/',views.get_machine_info, name='Get All The Machine Details'),
    path('machine_image/<path:image_path>/',machine_image,name="Getting the Machine Image"), 
    path('add_machine_requests/',views.Machine_Requests_View,name="Requesting A Machine"),
    path('machine_requested/<int:farmer_id>/',views.machine_requested,name="Machine Requested By Id"),
    path('delete_machines_requested', views.delete_machine_request, name='Deleting The Machine Requested'),
    path('get_machines_sort/<str:sort_by>/',views.get_machine_info_sort, name='Get All The Machine Details With Sort'),
    path('requested_single_machine/<int:machine_id>/',views.requested_each_machine_status,name="Requeted Each Single Lands Status"),


# -------------------------------------------------------------------------------------------------#


# -------------------------------------------------------------------------------------------------#
                                        #Customers View 

    # Land Requests View
    path('get_lands/', get_available_lands, name='Get All The Available Land Details'),
    path('single_lands/<int:land_id>/', get_single_land_info, name='Get A Single Land Land Details'),
    path('land_image/<path:image_path>/',lands_image,name="Getting the Land Image"), 
    path('add_land_requests/',Add_Land_View,name="Request For Land"),
    path('requested_land_status/<int:customer_id>/',requested_land_status,name="Requeted Lands Status"),
    path('requested_single_land/<int:request_id>/',requested_each_land_status,name="Requeted Each Single Lands Status"),
    path('delete_land_requested/',delete_lands_requested,name="Delete Land Requested"),
    path('land_approved/<int:user_id>/', get_land_approved, name='Get All Approved Land Details'),

    
    # Vegetable Requests View
    path('available_vegetables/',get_available_vegetables,name='Get All The Available Vegetables Details'),
    path('single_vegetables/<int:veg_id>/', get_single_vegetables_info, name='Get A Single Vegetables Details'),
    path('vegetables_image/<path:image_path>/',vegetables_image,name="Getting the Vegetables Image"), 
    path('add_vegetables_requests/',Add_Vegetables_View,name="Request For Vegetables"),
    path('requested_vegetables_status/<int:customer_id>/',requested_vegetables_status,name="Requeted Vegetables Status"),
    path('requested_single_vegetables/<int:veg_id>/',requested_each_vegetables_status,name="Requeted Each Single Vegetables Status"),
    path('delete_vegetables_requested/',delete_vegetables_requested,name="Delete Vegetables Requested"),
    path('vegetables_approved/<int:user_id>/', get_vegetables_approved, name='Get All Approved Land Details'),

 # ---------------------------------------------------------------------------------------------------#


 # ---------------------------------------------------------------------------------------------------#
                                                # Admin
    #Machine View
    path('addmachine/',Add_Machine_View, name='Add Machine Details'),
    path('machine_details/<int:admin_id>/',machine_details, name='Get Machines Details By Admin ID'),
    path('handle_machine/<int:admin_id>/<int:machine_id>/',handle_machine_info, name='Managing Machine'),
    path('delete_machine_details',delete_multiple_machines, name='Delete Multiple Machines Information'),
    path('machine_pending/',machine_pending, name='Pending Land Requests (For Count)'),
    path('machine_status/<str:status>', machine_status, name='Machine Requests With Status'),
    path('machine_response/',machine_response, name='Response For Customers Vegetables Requests'),
    path('machine_requester_details/<int:request_id>/',machine_requester_details, name='Each Vegetables Requester Details'),

]

