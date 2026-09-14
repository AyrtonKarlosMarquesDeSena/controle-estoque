from django.core.management.base import BaseCommand
from estoque_app.models import Ingrediente
from datetime import date


class Command(BaseCommand):
    help = "Popula o banco com ingredientes de exemplo, se estiver vazio"

    def handle(self, *args, **options):
        if Ingrediente.objects.exists():
            self.stdout.write("Já existem ingredientes, nada a fazer.")
            return

        Ingrediente.objects.create(
            nome="Farinha", meta=20, estoque_atual=8, unidade="KG",
            data_validade=date(2027, 1, 1), consumo_real=12, houve_ruptura=False
        )
        Ingrediente.objects.create(
            nome="Leite", meta=15, estoque_atual=5, unidade="L",
            data_validade=date(2026, 8, 1), consumo_real=10, houve_ruptura=False
        )
        Ingrediente.objects.create(
            nome="Ovo", meta=100, estoque_atual=0, unidade="UN",
            data_validade=date(2027, 1, 1), consumo_real=100, houve_ruptura=True
        )
        Ingrediente.objects.create(
            nome="Arroz", meta=30, estoque_atual=10, unidade="KG",
            data_validade=date(2027, 1, 1), consumo_real=0, houve_ruptura=False
        )

        self.stdout.write("Ingredientes de exemplo criados!")