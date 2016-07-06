"""happymeter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from meter import views

#router = routers.DefaultRouter()
#router.register(r'/(?P<word>[a-zA-Z0-9\\@:_]+)/state/$', views.StateList)
#router.register(r'state', views.StateViewSet)
#router.register(r'word', views.WordViewSet)



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('meter.urls')),
]

#urlpatterns = format_suffix_patterns(urlpatterns)

if settings.DEBUG:
	urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)