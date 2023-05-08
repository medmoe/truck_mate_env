from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from .serializers import UserSerializer

from .models import Driver, Truck, Performance, Cost
from .serializers import (
    DriverSerializer,
    TruckSerializer,
    PerformanceSerializer,
    CostSerializer,
)
from .permissions import IsOwnerOrReadOnly


class SignUpView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        drivers = Driver.objects.all()
        trucks = Truck.objects.all()
        driver_serializer = DriverSerializer(drivers, many=True)
        truck_serializer = TruckSerializer(trucks, many=True)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data.get('username'))
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {'token': token.key,
                 'user_id': user.id,
                 'drivers': driver_serializer.data,
                 'trucks': truck_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        drivers = Driver.objects.all()
        trucks = Truck.objects.all()
        driver_serializer = DriverSerializer(drivers, many=True)
        truck_serializer = TruckSerializer(trucks, many=True)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    'token': token.key,
                    'user_id': user.id,
                    'drivers': driver_serializer.data,
                    'trucks': truck_serializer.data
                }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class DriverList(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer


class DriverDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer


class TruckList(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer


class TruckDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer


class PerformanceList(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer


class PerformanceDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer


class CostList(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Cost.objects.all()
    serializer_class = CostSerializer


class CostDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Cost.objects.all()
    serializer_class = CostSerializer
