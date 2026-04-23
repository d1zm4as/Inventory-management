from django.core.exceptions import ValidationError
from django.test import TestCase

from apps.core.models import Category, Location, Product, StockItem
from apps.core.services import adjust_stock, receive_stock, record_sale, reserve_stock


class HealthCheckTests(TestCase):
    def test_health_endpoint(self):
        response = self.client.get("/api/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")


class StockServiceTests(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Widgets", slug="widgets")
        self.location = Location.objects.create(name="Main Warehouse", code="WH-01")
        self.product = Product.objects.create(
            name="Widget A",
            sku="WIDG-A",
            category=self.category,
            unit_price="19.99",
        )
        self.stock_item = StockItem.objects.create(
            product=self.product,
            location=self.location,
            on_hand=10,
            reserved=2,
        )

    def test_reserve_stock_increases_reserved_quantity(self):
        movement = reserve_stock(self.stock_item, 3, note="Customer checkout hold")
        self.stock_item.refresh_from_db()

        self.assertEqual(movement.quantity, 3)
        self.assertEqual(movement.movement_type, "reservation")
        self.assertEqual(self.stock_item.on_hand, 10)
        self.assertEqual(self.stock_item.reserved, 5)
        self.assertEqual(self.stock_item.available, 5)

    def test_adjust_stock_rejects_dropping_below_reserved(self):
        with self.assertRaises(ValidationError):
            adjust_stock(self.stock_item, -9, note="Broken count")

    def test_receive_stock_increases_on_hand(self):
        movement = receive_stock(self.stock_item, 4, note="Vendor delivery")
        self.stock_item.refresh_from_db()

        self.assertEqual(movement.movement_type, "receipt")
        self.assertEqual(self.stock_item.on_hand, 14)
        self.assertEqual(self.stock_item.reserved, 2)

    def test_record_sale_reduces_reserved_and_on_hand(self):
        movement = record_sale(self.stock_item, 2, note="Completed checkout")
        self.stock_item.refresh_from_db()

        self.assertEqual(movement.movement_type, "sale")
        self.assertEqual(self.stock_item.on_hand, 8)
        self.assertEqual(self.stock_item.reserved, 0)
