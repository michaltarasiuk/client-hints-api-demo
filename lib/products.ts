import type { BadgeVariant } from "@/components/ui/badge";

export type ProductStatus = "active" | "draft" | "archived";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  updatedAt: string;
}

export const products: Product[] = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    stock: 142,
    status: "active",
    updatedAt: "2026-07-10",
  },
  {
    id: "PRD-002",
    name: "Ergonomic Keyboard",
    category: "Electronics",
    price: 89.5,
    stock: 67,
    status: "active",
    updatedAt: "2026-07-09",
  },
  {
    id: "PRD-003",
    name: "Standing Desk",
    category: "Furniture",
    price: 449.0,
    stock: 23,
    status: "active",
    updatedAt: "2026-07-08",
  },
  {
    id: "PRD-004",
    name: "Monitor Arm",
    category: "Accessories",
    price: 59.99,
    stock: 88,
    status: "draft",
    updatedAt: "2026-07-07",
  },
  {
    id: "PRD-005",
    name: "USB-C Hub",
    category: "Electronics",
    price: 34.99,
    stock: 210,
    status: "active",
    updatedAt: "2026-07-06",
  },
  {
    id: "PRD-006",
    name: "Desk Lamp",
    category: "Furniture",
    price: 45.0,
    stock: 56,
    status: "active",
    updatedAt: "2026-07-05",
  },
  {
    id: "PRD-007",
    name: "Webcam HD",
    category: "Electronics",
    price: 79.99,
    stock: 34,
    status: "archived",
    updatedAt: "2026-07-04",
  },
  {
    id: "PRD-008",
    name: "Notebook Set",
    category: "Stationery",
    price: 12.5,
    stock: 320,
    status: "active",
    updatedAt: "2026-07-03",
  },
  {
    id: "PRD-009",
    name: "Mechanical Pencil",
    category: "Stationery",
    price: 8.99,
    stock: 450,
    status: "active",
    updatedAt: "2026-07-02",
  },
  {
    id: "PRD-010",
    name: "Office Chair",
    category: "Furniture",
    price: 299.0,
    stock: 18,
    status: "active",
    updatedAt: "2026-07-01",
  },
  {
    id: "PRD-011",
    name: "Laptop Stand",
    category: "Accessories",
    price: 39.99,
    stock: 95,
    status: "active",
    updatedAt: "2026-06-30",
  },
  {
    id: "PRD-012",
    name: "Mouse Pad XL",
    category: "Accessories",
    price: 19.99,
    stock: 180,
    status: "draft",
    updatedAt: "2026-06-29",
  },
  {
    id: "PRD-013",
    name: "Cable Organizer",
    category: "Accessories",
    price: 14.5,
    stock: 275,
    status: "active",
    updatedAt: "2026-06-28",
  },
  {
    id: "PRD-014",
    name: "Whiteboard",
    category: "Stationery",
    price: 55.0,
    stock: 42,
    status: "active",
    updatedAt: "2026-06-27",
  },
  {
    id: "PRD-015",
    name: "Portable SSD 1TB",
    category: "Electronics",
    price: 119.99,
    stock: 61,
    status: "active",
    updatedAt: "2026-06-26",
  },
  {
    id: "PRD-016",
    name: "Desk Mat",
    category: "Accessories",
    price: 24.99,
    stock: 130,
    status: "active",
    updatedAt: "2026-06-25",
  },
  {
    id: "PRD-017",
    name: "Filing Cabinet",
    category: "Furniture",
    price: 189.0,
    stock: 12,
    status: "archived",
    updatedAt: "2026-06-24",
  },
  {
    id: "PRD-018",
    name: "Label Maker",
    category: "Stationery",
    price: 49.99,
    stock: 73,
    status: "active",
    updatedAt: "2026-06-23",
  },
];

export const categories = [...new Set(products.map((p) => p.category))];

const productStatusVariants = {
  active: "default",
  draft: "secondary",
  archived: "outline",
} as const satisfies Record<ProductStatus, BadgeVariant>;

export function productStatusVariant(status: ProductStatus): BadgeVariant {
  return productStatusVariants[status];
}
