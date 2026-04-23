"""Serializers for the core inventory management app."""

from rest_framework import serializers

from .models import Category, Location, Product, StockItem, StockMovement


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            "id",
            "name",
            "code",
            "address",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "sku",
            "category",
            "category_name",
            "description",
            "unit_price",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class StockItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_sku = serializers.CharField(source="product.sku", read_only=True)
    location_name = serializers.CharField(source="location.name", read_only=True)
    location_code = serializers.CharField(source="location.code", read_only=True)
    available = serializers.IntegerField(read_only=True)

    class Meta:
        model = StockItem
        fields = [
            "id",
            "product",
            "product_name",
            "product_sku",
            "location",
            "location_name",
            "location_code",
            "on_hand",
            "reserved",
            "available",
            "reorder_point",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "available"]


class StockMovementSerializer(serializers.ModelSerializer):
    stock_item_sku = serializers.CharField(source="stock_item.product.sku", read_only=True)
    location_code = serializers.CharField(source="stock_item.location.code", read_only=True)
    movement_label = serializers.CharField(source="get_movement_type_display", read_only=True)

    class Meta:
        model = StockMovement
        fields = [
            "id",
            "stock_item",
            "stock_item_sku",
            "location_code",
            "movement_type",
            "movement_label",
            "quantity",
            "note",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
