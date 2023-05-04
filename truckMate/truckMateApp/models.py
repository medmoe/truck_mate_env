from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Driver(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=50)
    starting_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)


class Truck(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    model = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    starting_date = models.DateField()
    year = models.PositiveSmallIntegerField()
    mileage = models.IntegerField()
    capacity = models.IntegerField()


class Performance(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE)
    date = models.DateField()
    starting_mileage = models.IntegerField()
    ending_mileage = models.IntegerField()
    starting_quantity = models.IntegerField()
    ending_quantity = models.IntegerField()
    starting_time = models.TimeField()
    ending_time = models.TimeField()


class Cost(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    date = models.DateField()
    gaz_refill = models.FloatField()
    maintenance = models.FloatField()
    description = models.TextField()
