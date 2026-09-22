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


@api_view(['GET'])
def listar_ingredientes(request):
    resultado = []

    for ingrediente in Ingrediente.objects.all():
        resultado.append({
            'id': ingrediente.id,
            'nome': ingrediente.nome,
            'meta': str(ingrediente.meta),
            'estoque_atual': str(ingrediente.estoque_atual),
            'unidade': ingrediente.unidade,
            'data_validade': str(ingrediente.data_validade),
            'consumo_real': str(ingrediente.consumo_real),
            'houve_ruptura': ingrediente.houve_ruptura,
        })

    return Response(resultado)


@api_view(['PUT'])
def atualizar_ingrediente(request, id):
    ingrediente = get_object_or_404(Ingrediente, id=id)
    dados = request.data

    ingrediente.nome = dados.get('nome', ingrediente.nome)
    ingrediente.meta = dados.get('meta', ingrediente.meta)
    ingrediente.estoque_atual = dados.get('estoque_atual', ingrediente.estoque_atual)
    ingrediente.unidade = dados.get('unidade', ingrediente.unidade)
    ingrediente.data_validade = dados.get('data_validade', ingrediente.data_validade)
    ingrediente.consumo_real = dados.get('consumo_real', ingrediente.consumo_real)
    ingrediente.houve_ruptura = dados.get('houve_ruptura', ingrediente.houve_ruptura)
    ingrediente.save()

    return Response({'id': ingrediente.id, 'nome': ingrediente.nome})