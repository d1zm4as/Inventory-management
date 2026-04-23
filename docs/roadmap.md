# Inventory Management Roadmap

This document tracks the path from the current scaffold to a production-ready deployment.

## Current State

What already exists:

- Django project scaffold
- DRF integration
- JWT auth endpoints
- API health check
- Initial inventory domain models
- Core inventory service functions
- Admin registrations
- Initial tests for health and stock flows
- Initial database migration
- Next.js frontend scaffold with landing, login, dashboard, and core route shells

## Delivery Goals

The project should end up as:

- a reservation-driven inventory platform
- an order and checkout system with traceable stock changes
- an operations tool with reporting and auditability
- a deployable app with repeatable local, staging, and production setup

## Technology Stack

Chosen core stack:

- Django
- Django REST Framework
- djangorestframework-simplejwt
- drf-spectacular
- django-filter
- PostgreSQL
- Redis
- Celery
- Gunicorn
- Docker
- Docker Compose
- pytest
- pytest-django
- ruff
- pre-commit
- GitHub Actions

Frontend stack:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Recharts

Nice-to-have additions:

- Sentry for error tracking
- django-debug-toolbar for local debugging
- structlog or JSON logging for structured logs
- Factory Boy and Faker for test data

## Milestones

### Milestone 1: Stabilize the Foundation

Goal: make the current scaffold reliable and easy to run locally.

Tasks:

- lock the chosen backend and frontend dependencies
- install and pin backend dependencies
- confirm Django starts cleanly with local settings
- run and fix migrations
- verify health endpoint and admin access
- clean up repo structure and document local setup

Exit criteria:

- `manage.py check` passes
- database migrations apply without errors
- health endpoint responds successfully
- local setup steps are documented
- the stack choices are reflected in the project docs

### Milestone 2: Core Inventory CRUD

Goal: make the main catalog and inventory objects fully manageable through the API.

Tasks:

- complete CRUD for categories
- complete CRUD for locations
- complete CRUD for products
- complete CRUD for stock items
- add filtering, search, and pagination
- improve serializer validation and error messages

Exit criteria:

- inventory objects can be created, updated, listed, and archived
- stock rows remain unique per product/location pair
- API responses are consistent and documented

### Milestone 3: Inventory Movement Rules

Goal: support real stock operations instead of static records.

Tasks:

- finalize receive stock flow
- finalize reserve stock flow
- finalize release stock flow
- finalize sale/checkout stock reduction
- finalize manual adjustment flow
- ensure stock never drops below zero
- write tests for each movement type

Exit criteria:

- every stock change produces a movement record
- on-hand and reserved stock stay consistent
- business rules are enforced in services and tests

### Milestone 4: Authentication and Authorization

Goal: secure the system and limit access by role and scope.

Tasks:

- define user roles
- add organization and location access rules
- enforce permissions on write endpoints
- separate staff, manager, and admin capabilities
- document JWT login and refresh usage

Exit criteria:

- authenticated and unauthenticated access behave as expected
- role-based restrictions are enforced
- API access can be scoped by location or organization

### Milestone 5: Reservation and Checkout

Goal: support the business flow that makes the platform useful in practice.

Tasks:

- create reservation records
- add reservation expiration handling
- add checkout confirmation flow
- add cancellation and release flow
- implement idempotency for order submission
- prevent double-selling reserved stock

Exit criteria:

- a checkout can reserve, confirm, or cancel stock cleanly
- expired reservations are cleaned up automatically
- repeated requests do not create duplicate orders

### Milestone 6: Reporting and Auditability

Goal: give operators visibility into inventory health and history.

Tasks:

- add low-stock reports
- add stock movement history views
- add order and checkout reporting
- add audit logs for critical changes
- add export support for inventory and sales data

Exit criteria:

- operators can inspect what changed, when, and by whom
- low-stock items are easy to identify
- common operational reports can be generated from the API

### Milestone 7: Background Jobs

Goal: automate recurring operations.

Tasks:

- configure Celery with Redis
- add reservation cleanup job
- add low-stock notification job
- add inventory reconciliation job
- add report generation jobs

Exit criteria:

- scheduled jobs run reliably
- long-running work is removed from request/response paths
- retries and failures are observable

### Milestone 8: Frontend Admin Panel

Goal: provide a usable operations interface.

Tasks:

- refine the Next.js admin shell
- connect shared layout, navigation, and route structure
- create login flow
- build inventory list and detail views
- build stock movement views
- build reservation and order views
- add dashboard KPIs and filters

Exit criteria:

- staff can manage inventory without relying on raw API calls
- primary business flows are accessible from the UI
- the frontend shell and route structure are in place

### Milestone 9: Testing and Quality Gates

Goal: reduce regressions before deployment.

Tasks:

- expand unit tests for services and models
- add API integration tests
- add auth and permission tests
- add checkout and reservation tests
- add smoke tests for deployment
- add linting and formatting checks

Exit criteria:

- critical paths are covered by automated tests
- CI can block broken changes
- test failures point to the right layer quickly

### Milestone 10: Deployment Readiness

Goal: make the app deployable in a repeatable way.

Tasks:

- add Docker and Docker Compose
- configure PostgreSQL for production
- configure Redis for cache and Celery
- configure Gunicorn for serving Django
- add environment-based settings for secrets and hosts
- add health checks and readiness checks
- add database migration steps to release flow
- add backups and rollback notes

Exit criteria:

- local, staging, and production environments are reproducible
- deployment steps are documented
- application starts and serves traffic in production mode

## Suggested Build Order

1. Stabilize the foundation
2. Complete core inventory CRUD
3. Implement inventory movement rules
4. Add authentication and authorization
5. Build reservation and checkout
6. Add reporting and auditability
7. Wire background jobs
8. Build the frontend admin panel
9. Expand tests and quality gates
10. Finish deployment readiness

## Deployment Checklist

- production secret key configured
- allowed hosts configured
- debug disabled
- PostgreSQL configured
- Redis configured
- migrations applied
- static files collected
- health endpoint verified
- admin access verified
- logging and monitoring configured
- backup and restore plan documented

## Notes

- The roadmap is intentionally backend-first because the current repository is at the backend foundation stage.
- The frontend should start after the core API contracts are stable enough to avoid churn.
- Deployment work should come last, but production constraints should be kept in mind during earlier milestones.
