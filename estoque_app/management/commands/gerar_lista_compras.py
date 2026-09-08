from django.core.management.base import BaseCommand
from estoque_app.models import Ingrediente


class Command(BaseCommand):
    help = "Gera a lista de compras com base nos ingredientes cadastrados"

    def handle(self, *args, **options):
        for ingrediente in Ingrediente.objects.all():
            quantidade = ingrediente.calcular_compra()

            if quantidade > 0:

                if quantidade == quantidade.to_integral_value():
                    quantidade = quantidade.to_integral_value()

                print(f"Comprar: {quantidade} {ingrediente.unidade} de {ingrediente.nome}")