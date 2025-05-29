import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductDetail {
  label: string;
  value: string;
}

interface ProductDetailsProps {
  details: ProductDetail[];
  description: string;
  features?: string[];
  specifications?: ProductDetail[];
  className?: string;
}

export function ProductDetails({
  details,
  description,
  features = [],
  specifications = [],
  className,
}: ProductDetailsProps) {
  return (
    <div className={className}>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-card/50">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-4">
          <Card className="diagonal-lines-subtle border-border bg-card/30">
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

                {features.length > 0 && (
                  <div>
                    <h4 className="mb-3 font-semibold text-foreground">Key Features</h4>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          <Card className="diagonal-lines-subtle border-border bg-card/30">
            <CardContent className="p-6">
              <div className="grid gap-3">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-center justify-between border-b border-border/50 py-2 last:border-b-0"
                  >
                    <span className="font-medium text-foreground">{detail.label}</span>
                    <Badge variant="secondary" className="bg-muted/50 text-muted-foreground">
                      {detail.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs" className="mt-4">
          <Card className="diagonal-lines-subtle border-border bg-card/30">
            <CardContent className="p-6">
              {specifications.length > 0 ? (
                <div className="grid gap-3">
                  {specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between border-b border-border/50 py-2 last:border-b-0"
                    >
                      <span className="font-medium text-foreground">{spec.label}</span>
                      <span className="text-sm text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No specifications available for this item.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
