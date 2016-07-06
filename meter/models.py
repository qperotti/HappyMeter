from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Word(models.Model):
	word = models.CharField(max_length=50, unique=True)
	score = models.FloatField(default=0)
	recurrence = models.PositiveIntegerField(default=0)
	added_day = models.DateField(auto_now=False, auto_now_add=True)
	updated_day = models.DateField(auto_now=True, auto_now_add=False)

	def __str__(self):
		return self.word

class State(models.Model):
	word = models.ForeignKey(Word, on_delete=models.CASCADE) 
	state = models.CharField(max_length=2)
	score = models.FloatField(default=0)
	recurrence = models.PositiveIntegerField(default=0)

	def __str__(self):
		return self.state + " -> " + self.word.word


class Date(models.Model):
	state = models.ForeignKey(State, on_delete=models.CASCADE) 
	date = models.DateField()
	score = models.FloatField(default=0)
	recurrence = models.PositiveIntegerField(default=0)

	def __str__(self):
		return str(self.date) + " -> " + self.state.state

