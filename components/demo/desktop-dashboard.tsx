import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  categories,
  productStatusVariant,
  products,
  type ProductStatus,
} from "@/lib/products";

export function DesktopDashboard() {
  return (
    <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-3 rounded-xl border bg-muted/30 p-4">
        <h3 className="text-sm font-medium">Filters</h3>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Category</p>
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <input
                type="checkbox"
                className="rounded border-input"
                readOnly
              />
              {category}
            </label>
          ))}
        </div>
        <div className="space-y-2 border-t pt-3">
          <p className="text-xs text-muted-foreground">Status</p>
          {(["active", "draft", "archived"] as ProductStatus[]).map(
            (status) => (
              <label
                key={status}
                className="flex items-center gap-2 text-sm capitalize text-muted-foreground"
              >
                <input
                  type="checkbox"
                  className="rounded border-input"
                  readOnly
                />
                {status}
              </label>
            ),
          )}
        </div>
        <div className="space-y-2 border-t pt-3">
          <p className="text-xs text-muted-foreground">Price range</p>
          <input
            type="range"
            min={0}
            max={500}
            defaultValue={250}
            className="w-full"
            readOnly
          />
          <p className="text-xs text-muted-foreground">$0 – $500</p>
        </div>
      </aside>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-medium">Product inventory</h2>
            <p className="text-sm text-muted-foreground">
              Full desktop view with table, filters, and bulk actions
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              Bulk edit
            </Button>
            <Button size="sm">Add product</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All products</CardTitle>
            <CardDescription>
              {products.length} items · sortable columns · row selection
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <input type="checkbox" readOnly aria-label="Select all" />
                  </TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        readOnly
                        aria-label={`Select ${product.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {product.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={productStatusVariant(product.status)}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.updatedAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="xs">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
