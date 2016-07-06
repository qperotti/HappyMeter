from rest_framework import serializers
from .models import Word, State, Date



class DateSerializer(serializers.ModelSerializer):


	class Meta:
		model = Date
		fields = ('date', 'score')

class StateSerializer(serializers.ModelSerializer):


	date_set = DateSerializer(many=True)

	class Meta:
		model = State
		fields = ('state', 'score', 'date_set')


class WordSerializer(serializers.ModelSerializer):

	state_set = StateSerializer(many=True)

	class Meta:
		model = Word
		fields = ('word', 'score', 'state_set')


