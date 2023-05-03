from datetime import date
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Driver, Truck, Performance, Cost
from .serializers import DriverSerializer, TruckSerializer, PerformanceSerializer, CostSerializer


class AuthenticationTest(APITestCase):
    def test_signup(self):
        url = '/signup/'
        data = {'username': 'testuser', 'password': 'testpass'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

    def test_login(self):
        url = '/login/'
        data = {'username': 'testUser', 'password': 'testPass'}
        User.objects.create_user(username=data['username'], password=data['password'])
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)


class DriverViewTestCase(APITestCase):
    """ Test suite for the driver views """

    def setUp(self):
        """ Define the test client and other test variables """
        self.user = User.objects.create_user(username="medmoe",
                                             email="med.seffah@gmail.com",
                                             password="passPhrase")
        self.driver_data = {
            "owner": self.user.id,
            "first_name": "John",
            "last_name": "Doe",
            "date_of_birth": "1990-01-01",
            "address": "123 Main st",
            "starting_date": "2022-01-01",
            "end_date": "2023-01-01"
        }

        self.client.force_authenticate(user=self.user)
        self.response = self.client.post(
            reverse('driver-list'),
            self.driver_data,
            format='json'
        )

    def test_create_driver(self):
        """ Test the driver creation API. """
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Driver.objects.count(), 1)
        self.assertEqual(Driver.objects.get().first_name, "John")

    def test_get_all_drivers(self):
        """ Test getting all drivers. """
        response = self.client.get(reverse('driver-list'))
        drivers = Driver.objects.all()
        serializer = DriverSerializer(drivers, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_driver(self):
        """ Test getting a single driver """
        driver = Driver.objects.first()
        response = self.client.get(reverse('driver-detail', args=[driver.id]))
        serializer = DriverSerializer(driver)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_driver(self):
        """ Test deleting a driver """
        driver = Driver.objects.first()
        response = self.client.delete(reverse('driver-detail', args=[driver.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Driver.objects.count(), 0)


class TruckViewTestCase(APITestCase):
    """ Test suite for the truck view """

    def setUp(self):
        """ Define the test client and other test variables """
        self.user = User.objects.create_user(username="medmoe",
                                             email="med.seffah@gmail.com",
                                             password="passPhrase")
        self.truck_data = {
            "owner": self.user.id,
            "model": "1030",
            "brand": "JAC",
            "starting_date": "2000-01-01",
            "year": "2013",
            "mileage": 100000,
            "capacity": 3000,
        }

        self.client.force_authenticate(user=self.user)
        self.response = self.client.post(
            reverse("truck-list"),
            self.truck_data,
            format='json',
        )

    def test_create_truck(self):
        """ Test the truck creation api """
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Truck.objects.count(), 1)
        self.assertEqual(Truck.objects.get().model, "1030")

    def test_get_all_trucks(self):
        """ Test getting all trucks """
        response = self.client.get(reverse("truck-list"))
        trucks = Truck.objects.all()
        serializer = TruckSerializer(trucks, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_truck(self):
        """ Test getting a single truck """
        truck = Truck.objects.first()
        response = self.client.get(reverse('truck-detail', args=[truck.id]))
        serializer = TruckSerializer(truck)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_truck(self):
        """ Test deleting a truck """
        truck = Truck.objects.first()
        response = self.client.delete(reverse("truck-detail", args=[truck.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Truck.objects.count(), 0)


class PerformanceViewTestCase(APITestCase):
    """ Test case suite for the Performance view """

    def setUp(self):
        self.user = User.objects.create_user(username="medmoe",
                                             email="med.seffah@gmail.com",
                                             password="passPhrase")
        self.client.force_authenticate(user=self.user)
        self.driver1 = Driver.objects.create(
            owner=self.user,
            first_name='John',
            last_name='Doe',
            date_of_birth='1990-01-01',
            address='123 Main St',
            starting_date='2021-01-01',
            end_date=None
        )
        self.driver2 = Driver.objects.create(
            owner=self.user,
            first_name='Jane',
            last_name='Doe',
            date_of_birth='1995-01-01',
            address='456 Main St',
            starting_date='2022-01-01',
            end_date=None
        )
        self.truck1 = Truck.objects.create(
            owner=self.user,
            model='Model A',
            brand='Brand A',
            starting_date='2021-01-01',
            year=2020,
            mileage=5000,
            capacity=100
        )
        self.truck2 = Truck.objects.create(
            owner=self.user,
            model='Model B',
            brand='Brand B',
            starting_date='2022-01-01',
            year=2021,
            mileage=10000,
            capacity=200
        )
        self.performance1 = Performance.objects.create(
            owner=self.user,
            driver=self.driver1,
            truck=self.truck1,
            date=date.today(),
            starting_mileage=5000,
            ending_mileage=6000,
            starting_quantity=50,
            ending_quantity=70,
            starting_time='08:00',
            ending_time='17:00'
        )
        self.performance2 = Performance.objects.create(
            owner=self.user,
            driver=self.driver2,
            truck=self.truck2,
            date=date.today(),
            starting_mileage=10000,
            ending_mileage=12000,
            starting_quantity=100, ending_quantity=120,
            starting_time='08:00', ending_time='17:00'
        )

    def test_get_all_performances(self):
        response = self.client.get(reverse('performance-list'))
        performances = Performance.objects.all()
        serializer = PerformanceSerializer(performances, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_single_performance(self):
        response = self.client.get(reverse('performance-detail', args=[self.performance1.id]))
        performance = Performance.objects.get(id=self.performance1.id)
        serializer = PerformanceSerializer(performance)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_create_performance(self):
        data = {
            'owner': self.user.id,
            'driver': self.driver1.id,
            'truck': self.truck1.id,
            'date': date.today(),
            'starting_mileage': 6000,
            'ending_mileage': 7000,
            'starting_quantity': 70,
            'ending_quantity': 90,
            'starting_time': '08:00',
            'ending_time': '18:00'
        }
        response = self.client.post(reverse('performance-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
