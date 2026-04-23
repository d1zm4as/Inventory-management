from django.contrib import admin

from .models import Category, Location, Product, StockItem, StockMovement


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_active", "updated_at")
    search_fields = ("name", "slug")
    list_filter = ("is_active",)


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ("name", "code", "is_active", "updated_at")
    search_fields = ("name", "code")
    list_filter = ("is_active",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "sku", "category", "unit_price", "is_active", "updated_at")
    search_fields = ("name", "sku")
    list_filter = ("category", "is_active")


@admin.register(StockItem)
class StockItemAdmin(admin.ModelAdmin):
    list_display = ("product", "location", "on_hand", "reserved", "available", "reorder_point")
    search_fields = ("product__name", "product__sku", "location__name", "location__code")
    list_filter = ("location", "product__category")


@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = ("stock_item", "movement_type", "quantity", "created_at")
    search_fields = ("stock_item__product__name", "stock_item__product__sku", "note")
    list_filter = ("movement_type",)
