from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status


# Create your tests here.

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
