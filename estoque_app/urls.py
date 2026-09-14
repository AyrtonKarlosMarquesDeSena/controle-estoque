from django.urls import path
from estoque_app import views

urlpatterns = [
    path('lista-compras/', views.lista_compras),
    path('ingredientes/', views.criar_ingrediente),
    path('ingredientes/<int:id>/', views.deletar_ingrediente),
]