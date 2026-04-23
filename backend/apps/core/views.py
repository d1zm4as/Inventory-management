from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Location, Product, StockItem, StockMovement
from .serializers import (
    CategorySerializer,
    LocationSerializer,
    ProductSerializer,
    StockItemSerializer,
    StockMovementSerializer,
)


class HealthCheckView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        return Response({"status": "ok", "service": "inventory-management"})


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer


class StockItemViewSet(viewsets.ModelViewSet):
    queryset = StockItem.objects.select_related("product", "location").all()
    serializer_class = StockItemSerializer


class StockMovementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StockMovement.objects.select_related(
        "stock_item",
        "stock_item__product",
        "stock_item__location",
    ).all()
    serializer_class = StockMovementSerializer
