from django.contrib import admin



from .models import Word, Date, State
# Register your models here.

admin.site.register(Word)
admin.site.register(Date)
admin.site.register(State)
