from django.db import models
from decimal import Decimal
from datetime import date



class Ingrediente(models.Model):
    UNIDADE_CHOICES = [
        ('KG', 'Quilo'),
        ('L', 'Litro'),
        ('UN', 'Unidade'),
    ]

    nome = models.CharField(max_length=100)
    meta = models.DecimalField(max_digits=10, decimal_places=2)
    estoque_atual = models.DecimalField(max_digits=10, decimal_places=2)
    unidade = models.CharField(max_length=2, choices=UNIDADE_CHOICES)
    data_validade = models.DateField()
    consumo_real = models.DecimalField(max_digits=10, decimal_places=2)
    houve_ruptura = models.BooleanField(default=False)

    def __str__(self):
        return self.nome

    def calcular_compra(self):

        if self.data_validade < date.today():
            quantidade = self.meta


        elif self.houve_ruptura:
            quantidade = self.consumo_real * Decimal("1.2")
            self.meta = quantidade  
            self.save()

      
        else:
            quantidade = self.meta - self.estoque_atual

        return max(quantidade, Decimal("0"))    