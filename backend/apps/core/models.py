from django.core.exceptions import ValidationError
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimestampedModel):
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Location(TimestampedModel):
    name = models.CharField(max_length=120)
    code = models.CharField(max_length=40, unique=True)
    address = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.code})"


class Product(TimestampedModel):
    name = models.CharField(max_length=180)
    sku = models.CharField(max_length=64, unique=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )
    description = models.TextField(blank=True)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.sku})"


class StockItem(TimestampedModel):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="stock_items",
    )
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name="stock_items",
    )
    on_hand = models.PositiveIntegerField(default=0)
    reserved = models.PositiveIntegerField(default=0)
    reorder_point = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["product__name", "location__name"]
        constraints = [
            models.UniqueConstraint(
                fields=["product", "location"],
                name="unique_stock_item_product_location",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.product.sku} @ {self.location.code}"

    @property
    def available(self) -> int:
        return self.on_hand - self.reserved

    def clean(self) -> None:
        super().clean()
        if self.reserved > self.on_hand:
            raise ValidationError({"reserved": "Reserved stock cannot exceed on-hand stock."})


class StockMovement(TimestampedModel):
    class MovementType(models.TextChoices):
        RECEIPT = "receipt", "Receipt"
        RESERVATION = "reservation", "Reservation"
        RELEASE = "release", "Release"
        SALE = "sale", "Sale"
        ADJUSTMENT = "adjustment", "Adjustment"

    stock_item = models.ForeignKey(
        StockItem,
        on_delete=models.CASCADE,
        related_name="movements",
    )
    movement_type = models.CharField(max_length=20, choices=MovementType.choices)
    quantity = models.PositiveIntegerField()
    note = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ["-created_at", "-id"]

    def __str__(self) -> str:
        return f"{self.get_movement_type_display()} x{self.quantity}"
