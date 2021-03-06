import json, os, random, string, redis, urllib

from collections import OrderedDict


from django.shortcuts import render, get_object_or_404, get_list_or_404, redirect 
from django.core.urlresolvers import reverse_lazy
from django.http import Http404, JsonResponse
from django.http import HttpResponse
from django.views import generic
from django.views.generic import View 
from django.db.models import Q
from django.core import serializers


from .serializers import StateSerializer, WordSerializer
from .models import Word, State, Date


from jenks import jenks #Used to aply jenks algorithm to the mapdata







####################################################
#################### CUSTOM API ####################
####################################################



# RETURN A JSON WITH ALL THE AVAILABLE WORDS/HASHTAGS/USERS
def WordSearchJson(request, word):

	words = Word.objects.filter(word__startswith=word).order_by('-recurrence')
	words_list = list()

	for word in words:
		words_list.append({'display': word.word, 'value': word.word})

	return HttpResponse(json.dumps(words_list))


######################################################################

# RETURN A JSON WITH THE OVERALL DATAMAP
def StatesJson(request, word):


	word = urllib.unquote(word);
	states = State.objects.filter(word__word=word)
	
	## Calculate subgrups with jenks
	if len(states) >= 3:
		scores = list()
		for state in states:
			scores.append(state.score)
		scores_jenks = jenks(scores,3)
		negative = float(scores_jenks[1])
		positive = float(scores_jenks[2])
	else:
		# We force to be neutral
		negative = 1
		positive = 10


	## Prepare the dict
	states_dict = dict()
	for state in states:

		if (state.score <= negative):
			fillKey = 'negative'
		elif (state.score >= positive):
			fillKey = 'positive'
		else:
			fillKey = 'neutral'


		states_dict[state.state] = {"fillKey": fillKey, "score": state.score,"recurrence": state.recurrence}

	states_dict = OrderedDict(sorted(states_dict.items(), key=lambda x: x[1]['score'], reverse=True))

	return HttpResponse(json.dumps(states_dict))

######################################################################

# RETURN A JSON WITH THE SCORE CHART DATA
def ScoreChartJson(request, word, state):

	word = urllib.unquote(word);
	
	state_score = list()
	state_xAxis = list()

	if(state=='overall'):
		dates = Date.objects.filter(state__state='AA').filter(state__word__word=word)
	else:
		dates = Date.objects.filter(state__state=state).filter(state__word__word=word)

	first = 0
	last = len(dates)

	dates = reversed(dates[first:last])


	for date in dates:
		state_score.append(date.score)
		state_xAxis.append(date.date.strftime('%m-%d-%Y'))

	chart_dict = dict()


	chart_dict['xAxis'] = {'categories' : state_xAxis}
	if(state=='overall'):
		chart_dict['series'] = ({'name' : 'Overall', 'data' : state_score , 'color' : '#008cba'})
	else:
		chart_dict['series'] = ({'name' : state, 'data' : state_score, 'color' : '#008cba'})


	return HttpResponse(json.dumps(chart_dict))


######################################################################

#RETURN A JSON WITH THE RECURRENCE CHART DATA
def RecurrenceChartJson(request, word, state):

	word = urllib.unquote(word);
	
	state_recurrence = list()
	state_xAxis = list()

	if(state=='overall'):
		dates = Date.objects.filter(state__state='AA').filter(state__word__word=word)
	else:
		dates = Date.objects.filter(state__state=state).filter(state__word__word=word)

	first = 0
	last = len(dates)

	dates = reversed(dates[first:last])



	for date in dates:
		state_recurrence.append(date.recurrence)
		state_xAxis.append(date.date.strftime('%m-%d-%Y'))

	chart_dict = dict()

	chart_dict['xAxis'] = {'categories' : state_xAxis}
	if(state=='overall'):
		chart_dict['series'] = ({'name' : 'Overall', 'data' : state_recurrence, 'color' : '#008cba'})
	else:
		chart_dict['series'] = ({'name' : state, 'data' : state_recurrence, 'color' : '#008cba'})


	return HttpResponse(json.dumps(chart_dict))



######################################################################

#CONTROLER USED FOR HOME

def home(request):

	return render(request, 'meter/home.html')

