import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookmarkCheck,
  LayoutDashboard,
  PackageSearch,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export const primaryNavigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    description: "Operational overview",
    icon: LayoutDashboard,
  },
  {
    label: "Inventory",
    href: "/inventory",
    description: "Catalog and stock",
    icon: PackageSearch,
  },
  {
    label: "Reservations",
    href: "/reservations",
    description: "Active holds",
    icon: BookmarkCheck,
  },
  {
    label: "Orders",
    href: "/orders",
    description: "Checkout activity",
    icon: ReceiptText,
  },
  {
    label: "Reports",
    href: "/reports",
    description: "Trends and alerts",
    icon: BarChart3,
  },
];

export const utilityNavigation: NavItem[] = [
  {
    label: "Security",
    href: "/login",
    description: "JWT sign in",
    icon: ShieldCheck,
  },
];
