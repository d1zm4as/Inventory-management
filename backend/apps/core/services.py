"""Service layer for inventory management business rules."""

from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import F

from .models import StockItem, StockMovement


def _ensure_stock_item(stock_item: StockItem) -> StockItem:
    return (
        StockItem.objects.select_for_update()
        .select_related("product", "location")
        .get(pk=stock_item.pk)
    )


@transaction.atomic
def receive_stock(stock_item: StockItem, quantity: int, note: str = "") -> StockMovement:
    if quantity <= 0:
        raise ValidationError({"quantity": "Quantity must be greater than zero."})

    item = _ensure_stock_item(stock_item)
    item.on_hand = F("on_hand") + quantity
    item.save(update_fields=["on_hand", "updated_at"])
    item.refresh_from_db(fields=["on_hand", "reserved", "updated_at"])

    return StockMovement.objects.create(
        stock_item=item,
        movement_type=StockMovement.MovementType.RECEIPT,
        quantity=quantity,
        note=note,
    )


@transaction.atomic
def reserve_stock(stock_item: StockItem, quantity: int, note: str = "") -> StockMovement:
    if quantity <= 0:
        raise ValidationError({"quantity": "Quantity must be greater than zero."})

    item = _ensure_stock_item(stock_item)
    if item.available < quantity:
        raise ValidationError({"quantity": "Not enough available stock to reserve."})

    item.reserved = F("reserved") + quantity
    item.save(update_fields=["reserved", "updated_at"])
    item.refresh_from_db(fields=["on_hand", "reserved", "updated_at"])

    return StockMovement.objects.create(
        stock_item=item,
        movement_type=StockMovement.MovementType.RESERVATION,
        quantity=quantity,
        note=note,
    )


@transaction.atomic
def release_stock(stock_item: StockItem, quantity: int, note: str = "") -> StockMovement:
    if quantity <= 0:
        raise ValidationError({"quantity": "Quantity must be greater than zero."})

    item = _ensure_stock_item(stock_item)
    if item.reserved < quantity:
        raise ValidationError({"quantity": "Cannot release more stock than is reserved."})

    item.reserved = F("reserved") - quantity
    item.save(update_fields=["reserved", "updated_at"])
    item.refresh_from_db(fields=["on_hand", "reserved", "updated_at"])

    return StockMovement.objects.create(
        stock_item=item,
        movement_type=StockMovement.MovementType.RELEASE,
        quantity=quantity,
        note=note,
    )


@transaction.atomic
def record_sale(stock_item: StockItem, quantity: int, note: str = "") -> StockMovement:
    if quantity <= 0:
        raise ValidationError({"quantity": "Quantity must be greater than zero."})

    item = _ensure_stock_item(stock_item)
    if item.reserved < quantity:
        raise ValidationError({"quantity": "Sale quantity must come from reserved stock."})
    if item.on_hand < quantity:
        raise ValidationError({"quantity": "Sale quantity cannot exceed on-hand stock."})

    item.on_hand = F("on_hand") - quantity
    item.reserved = F("reserved") - quantity
    item.save(update_fields=["on_hand", "reserved", "updated_at"])
    item.refresh_from_db(fields=["on_hand", "reserved", "updated_at"])

    if item.on_hand < 0 or item.reserved < 0:
        raise ValidationError("Stock cannot go below zero.")

    return StockMovement.objects.create(
        stock_item=item,
        movement_type=StockMovement.MovementType.SALE,
        quantity=quantity,
        note=note,
    )


@transaction.atomic
def adjust_stock(stock_item: StockItem, quantity_delta: int, note: str = "") -> StockMovement:
    item = _ensure_stock_item(stock_item)
    next_on_hand = item.on_hand + quantity_delta
    if next_on_hand < 0:
        raise ValidationError({"quantity_delta": "Stock cannot go below zero."})
    if next_on_hand < item.reserved:
        raise ValidationError({"quantity_delta": "Adjusted stock cannot fall below reserved stock."})

    item.on_hand = next_on_hand
    item.save(update_fields=["on_hand", "updated_at"])
    item.refresh_from_db(fields=["on_hand", "reserved", "updated_at"])

    return StockMovement.objects.create(
        stock_item=item,
        movement_type=StockMovement.MovementType.ADJUSTMENT,
        quantity=abs(quantity_delta),
        note=note,
    )
