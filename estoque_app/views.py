from rest_framework.decorators import api_view
from rest_framework.response import Response
from estoque_app.models import Ingrediente


@api_view(['GET'])
def lista_compras(request):
    resultado = []

    for ingrediente in Ingrediente.objects.all():
        quantidade = ingrediente.calcular_compra()

        if quantidade > 0:
            if quantidade == quantidade.to_integral_value():
                quantidade = quantidade.to_integral_value()

            resultado.append({
                'ingrediente': ingrediente.nome,
                'quantidade': str(quantidade),
                'unidade': ingrediente.unidade,
            })

    return Response(resultado)