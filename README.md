# Inventory Management

A Django-based inventory and checkout platform designed to look and feel like a real business system.

## Why this project is strong

This is a good next step for a `pleno`/`senior`-leaning portfolio because it moves beyond simple CRUD into business rules, stock reservation, order flows, and operational visibility.

## Recommended stack

- Django
- Django REST Framework
- djangorestframework-simplejwt
- drf-spectacular
- django-filter
- PostgreSQL
- Redis
- Celery
- Gunicorn
- Docker and Docker Compose
- pytest and pytest-django
- ruff
- pre-commit
- GitHub Actions
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Recharts
- Sentry
- django-debug-toolbar

## Local Setup

Backend:

```bash
cd backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py check
python manage.py migrate
python manage.py runserver
```

Frontend:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Core idea

Build an inventory platform where users can:

- manage products, categories, and suppliers
- track stock levels across locations
- reserve stock during checkout
- confirm purchases or release reservations
- monitor low-stock alerts and restock events
- view audit logs and operational metrics

## Main features

### Inventory

- product catalog with variants and categories
- stock by warehouse or store
- low-stock thresholds
- stock movement history
- restock records and adjustments

### Checkout flow

- temporary stock reservation
- reservation expiration
- checkout confirmation
- cancellation and release flow
- idempotent order processing

### Admin and operations

- role-based access control
- dashboard with KPIs
- searchable product and order tables
- filters by status, category, and location
- export of inventory and sales data

### Background jobs

- reservation cleanup
- low-stock notifications
- scheduled inventory reconciliation
- report generation

### Reliability and observability

- request logging
- audit trail for inventory changes
- health checks
- structured API responses
- automated tests for critical flows

## Business rules to highlight

- one product can exist in multiple locations
- stock cannot go below zero
- reservation windows must expire automatically
- a checkout must be idempotent
- inventory changes should be traceable
- permissions should depend on user role and location

## Data model suggestion

- `User`
- `Organization`
- `Location`
- `Category`
- `Product`
- `ProductVariant`
- `StockItem`
- `StockMovement`
- `Reservation`
- `Order`
- `OrderItem`
- `AuditLog`

## Suggested API endpoints

- `POST /auth/login/`
- `GET /products/`
- `POST /products/`
- `GET /inventory/`
- `POST /reservations/`
- `POST /checkout/`
- `POST /orders/{id}/cancel/`
- `GET /reports/low-stock/`
- `GET /audit-logs/`

## Folder structure idea

```text
inventory-management/
  backend/
  frontend/
  docker/
  docs/
  tests/
```

## Milestone plan

### Milestone 1

- lock the stack and development tooling
- auth and roles
- product and category CRUD
- basic inventory tracking

### Milestone 2

- stock reservation and checkout flow
- Celery cleanup job
- low-stock alerts

### Milestone 3

- dashboard and analytics
- audit logs
- exports and reporting

### Milestone 4

- tests
- Docker Compose
- deployment
- README diagrams and tradeoffs

## Positioning

If you build this well, it can be framed as:

- an inventory control system
- a reservation-driven checkout platform
- an operations dashboard for stores or warehouses

That makes it more attractive than a generic CRUD app because it shows concurrency handling, business rules, and backend maturity.
