import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Text } from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types";

type WishlistResponse = {
  count: number;
};

const ProductWidget = ({ data: product }: DetailWidgetProps<AdminProduct>) => {
  const { data, isLoading } = useQuery<WishlistResponse>({
    // Backend route is defined in src/api/admin/products/[id]/wishlists/route.ts
    // so we need to call the plural `/wishlists` endpoint.
    queryFn: () => sdk.client.fetch(`/admin/products/${product.id}/wishlists`),
    queryKey: [["products", product.id, "wishlists"]],
  });

  return (
    <Container className="p-4 space-y-2">
      <Heading level="h3">Wishlist</Heading>
      <Text size="small" className="text-ui-fg-subtle">
        {isLoading
          ? "Loading..."
          : `This product is in ${data?.count ?? 0} wishlist${
              data?.count === 1 ? "" : "s"
            }.`}
      </Text>
    </Container>
  );
};

export const config = defineWidgetConfig({
  // Place the card near the bottom of the product details page instead of above the title
  zone: "product.details.side.after",
});

export default ProductWidget;
