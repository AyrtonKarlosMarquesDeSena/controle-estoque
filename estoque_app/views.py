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
                'id' : ingrediente.id,
                'ingrediente': ingrediente.nome,
                'quantidade': str(quantidade),
                'unidade': ingrediente.unidade,
            })

    return Response(resultado)


@api_view(['POST'])
def criar_ingrediente(request):
    dados = request.data

    ingrediente = Ingrediente.objects.create(
        nome=dados.get('nome'),
        meta=dados.get('meta'),
        estoque_atual=dados.get('estoque_atual'),
        unidade=dados.get('unidade'),
        data_validade=dados.get('data_validade'),
        consumo_real=dados.get('consumo_real', 0),
        houve_ruptura=dados.get('houve_ruptura', False),
    )

    return Response({'id': ingrediente.id, 'nome': ingrediente.nome}, status=201)


from django.shortcuts import get_object_or_404


@api_view(['DELETE'])
def deletar_ingrediente(request, id):
    ingrediente = get_object_or_404(Ingrediente, id=id)
    ingrediente.delete()
    return Response(status=204)