from django.db import models

# Create your models here.
class Template(models.Model):
    name = models.CharField(max_length=120)

    def _str_(self):
        return self.name