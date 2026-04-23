from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    CategoryViewSet,
    HealthCheckView,
    LocationViewSet,
    ProductViewSet,
    StockItemViewSet,
    StockMovementViewSet,
)

router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"locations", LocationViewSet, basename="location")
router.register(r"products", ProductViewSet, basename="product")
router.register(r"inventory", StockItemViewSet, basename="stock-item")
router.register(r"stock-movements", StockMovementViewSet, basename="stock-movement")

urlpatterns = [
    path("health/", HealthCheckView.as_view(), name="health"),
    path("auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]
