from django.contrib import admin
from .models import Template

class TemplateAdmin(admin.ModelAdmin):
    list_display = ('name',)
# Register your models here.
admin.site.register(Template, TemplateAdmin)