export type Metric = {
  label: string;
  value: string;
  delta: string;
  tone: "emerald" | "indigo" | "amber" | "rose";
  detail: string;
};

export type InventoryRow = {
  sku: string;
  name: string;
  location: string;
  onHand: number;
  reserved: number;
  available: number;
  status: "healthy" | "watch" | "low";
};

export type MovementRow = {
  sku: string;
  action: string;
  quantity: string;
  when: string;
  note: string;
};

export type ReservationRow = {
  ref: string;
  customer: string;
  sku: string;
  quantity: number;
  expiresIn: string;
  status: "active" | "expiring" | "expired";
};

export type OrderRow = {
  ref: string;
  status: "confirmed" | "pending" | "cancelled";
  total: string;
  location: string;
  channel: string;
};

export const metrics: Metric[] = [
  {
    label: "On-hand stock",
    value: "24,318",
    delta: "+4.2%",
    tone: "emerald",
    detail: "Across 4 active locations",
  },
  {
    label: "Reserved stock",
    value: "1,284",
    delta: "+8.1%",
    tone: "indigo",
    detail: "Tied to checkout holds",
  },
  {
    label: "Low-stock SKUs",
    value: "18",
    delta: "-3",
    tone: "amber",
    detail: "Need replenishment review",
  },
  {
    label: "Orders today",
    value: "96",
    delta: "+11%",
    tone: "rose",
    detail: "From POS and web checkouts",
  },
];

export const inventoryRows: InventoryRow[] = [
  {
    sku: "WIDG-A",
    name: "Widget Alpha",
    location: "Main Warehouse",
    onHand: 120,
    reserved: 18,
    available: 102,
    status: "healthy",
  },
  {
    sku: "WIDG-B",
    name: "Widget Beta",
    location: "Downtown Store",
    onHand: 24,
    reserved: 10,
    available: 14,
    status: "watch",
  },
  {
    sku: "GADG-XL",
    name: "Gadget XL",
    location: "North Hub",
    onHand: 7,
    reserved: 4,
    available: 3,
    status: "low",
  },
];

export const movements: MovementRow[] = [
  {
    sku: "WIDG-A",
    action: "Reservation",
    quantity: "-4",
    when: "2 min ago",
    note: "Checkout hold created",
  },
  {
    sku: "GADG-XL",
    action: "Receipt",
    quantity: "+24",
    when: "18 min ago",
    note: "Inbound vendor delivery",
  },
  {
    sku: "WIDG-B",
    action: "Sale",
    quantity: "-2",
    when: "41 min ago",
    note: "Completed POS order",
  },
];

export const reservations: ReservationRow[] = [
  {
    ref: "RES-2048",
    customer: "Acme Stores",
    sku: "WIDG-A",
    quantity: 12,
    expiresIn: "14 min",
    status: "active",
  },
  {
    ref: "RES-2049",
    customer: "Northside Retail",
    sku: "GADG-XL",
    quantity: 4,
    expiresIn: "4 min",
    status: "expiring",
  },
  {
    ref: "RES-2050",
    customer: "Blue Market",
    sku: "WIDG-B",
    quantity: 2,
    expiresIn: "expired",
    status: "expired",
  },
];

export const orders: OrderRow[] = [
  {
    ref: "ORD-10024",
    status: "confirmed",
    total: "$4,860",
    location: "Main Warehouse",
    channel: "Admin checkout",
  },
  {
    ref: "ORD-10025",
    status: "pending",
    total: "$1,240",
    location: "Downtown Store",
    channel: "Reservation",
  },
  {
    ref: "ORD-10026",
    status: "cancelled",
    total: "$0",
    location: "North Hub",
    channel: "Expired hold",
  },
];
