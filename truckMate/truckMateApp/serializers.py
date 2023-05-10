from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Driver, Truck, Performance, Cost


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    msg = 'User account is disabled.'
                    raise serializers.ValidationError(msg, code='authorization')
            else:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "username" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }


class TruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Truck
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }


class PerformanceSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()
    truck = TruckSerializer()

    class Meta:
        model = Performance
        fields = '__all__'

    def create(self, validated_data):
        driver_data = validated_data.pop('driver')
        truck_data = validated_data.pop('truck')
        driver = Driver.objects.get(id=driver_data['id'])
        truck = Truck.objects.get(id=truck_data['id'])
        performance = Performance.objects.create(driver=driver, truck=truck, **validated_data)
        return performance

    def update(self, instance, validated_data):
        instance.date = validated_data.get('date', instance.date)
        instance.starting_mileage = validated_data.get('starting_mileage', instance.starting_mileage)
        instance.ending_mileage = validated_data.get('ending_mileage', instance.ending_mileage)
        instance.starting_quantity = validated_data.get('starting_quantity', instance.starting_quantity)
        instance.ending_quantity = validated_data.get('ending_quantity', instance.ending_quantity)
        instance.starting_time = validated_data.get('starting_time', instance.starting_time)
        instance.ending_time = validated_data.get('ending_time', instance.ending_time)

        driver_data = validated_data.get('driver')
        if driver_data:
            driver = Driver.objects.get(id=driver_data['id'])
            instance.driver = driver

        truck_data = validated_data.get('truck')
        if truck_data:
            truck = Truck.objects.get(id=truck_data['id'])
            instance.truck = truck

        instance.save()
        return instance


class CostSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()
    truck = TruckSerializer()

    class Meta:
        model = Cost
        fields = '__all__'

    def create(self, validated_data):
        driver_data = validated_data.pop('driver')
        truck_data = validated_data.pop('truck')
        driver = Driver.objects.get(id=driver_data['id'])
        truck = Truck.objects.get(id=truck_data['id'])
        cost = Cost.objects.create(driver=driver, truck=truck, **validated_data)
        return cost

    def update(self, instance, validated_data):
        driver_data = validated_data.get('driver')
        if driver_data:
            driver = Driver.objects.get(id=driver_data['id'])
            instance.driver = driver
        truck_data = validated_data.get('truck')
        if truck_data:
            truck = Truck.objects.get(id=truck_data['id'])
            instance.truck = truck

        instance.date = validated_data.get('date', instance.date)
        instance.gaz_refill = validated_data.get('gaz_refill', instance.gaz_refill)
        instance.maintenance = validated_data.get('maintenance', instance.maintenance)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance
