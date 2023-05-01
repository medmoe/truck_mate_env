from django.urls import path
from .views import (
    SignUpView,
    LoginView,
    DriverList,
    DriverDetail,
    TruckList,
    TruckDetail,
    PerformanceList,
    PerformanceDetail,
    CostList,
    CostDetail
)

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    # driver urls
    path('drivers/', DriverList.as_view(), name='driver-list'),
    path('drivers/<int:pk>/', DriverDetail.as_view(), name='driver-detail'),
    # truck urls
    path('trucks/', TruckList.as_view(), name='truck-list'),
    path('trucks/<int:pk>/', TruckDetail.as_view(), name='truck-detail'),
    # performance urls
    path('performance/', PerformanceList.as_view(), name='performance-list'),
    path('performance/<int:pk>/', PerformanceDetail.as_view(), name='performance-detail'),
    # cost urls
    path('cost/', CostList.as_view(), name='cost-list'),
    path('cost/<int:pk>/', CostDetail.as_view(), name='cost-detail'),
]
