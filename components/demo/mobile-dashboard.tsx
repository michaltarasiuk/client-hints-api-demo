import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { productStatusVariant, products } from "@/lib/products";

export function MobileDashboard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Products</h2>
          <p className="text-sm text-muted-foreground">
            Mobile card layout · swipe-friendly · simplified actions
          </p>
        </div>
        <Button size="sm">Add</Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", "Active", "Draft", "Low stock"].map((filter) => (
          <Button
            key={filter}
            variant={filter === "All" ? "default" : "outline"}
            size="xs"
            className="shrink-0"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <Card key={product.id} size="sm">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>
                    {product.id} · {product.category}
                  </CardDescription>
                </div>
                <Badge variant={productStatusVariant(product.status)}>
                  {product.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Stock</span>
                <span>{product.stock} units</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Updated</span>
                <span>{product.updatedAt}</span>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                View
              </Button>
              <Button size="sm" className="flex-1">
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <nav className="sticky bottom-0 flex justify-around rounded-xl border bg-background p-2">
        {["Home", "Products", "Orders", "More"].map((item, index) => (
          <Button
            key={item}
            variant={index === 1 ? "secondary" : "ghost"}
            size="xs"
            className="flex-1"
          >
            {item}
          </Button>
        ))}
      </nav>
    </div>
  );
}
