from django.conf.urls import url, include
from . import views

app_name = 'meter'

urlpatterns = [
	
    url(r'^$', views.home, name='home'),
    url(r'^api/words$', views.WordsJson),
    url(r'^api/(?P<word>[a-zA-Z0-9\\@%#_]+)/map$', views.StatesJson),
    url(r'^api/(?P<word>[a-zA-Z0-9\\@%#_]+)/(?P<state>[a-zA-Z0-9]+)/scorechart$', views.ScoreChartJson),
    url(r'^api/(?P<word>[a-zA-Z0-9\\@%#_]+)/(?P<state>[a-zA-Z0-9]+)/recurrencechart$', views.RecurrenceChartJson)
]

#urlpatterns = format_suffix_patterns(urlpatterns)