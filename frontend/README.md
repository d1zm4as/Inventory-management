# Frontend

This folder contains the Next.js admin and operations UI for the inventory system.

## What is here now

- public landing page
- login preview screen
- dashboard shell
- inventory table view
- reservations view
- orders view
- reports view
- reusable shell, metric card, section card, and data table components

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- lucide-react icons
- clsx for class composition

## Planned Next Steps

- connect the pages to the backend API
- add real JWT login handling
- wire state to inventory, order, and reservation endpoints
- replace mock data with server responses
- add charts and richer filters

## Local Setup

Once dependencies are installed, run:

```bash
npm install
npm run dev
```

The app is expected to run from the `frontend/` directory.
