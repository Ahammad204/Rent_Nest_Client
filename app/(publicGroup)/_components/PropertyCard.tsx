import Link from "next/link";
import Image from "next/image";
import { MapPin, Home, ArrowRight } from "lucide-react";
import type { IProperty } from "@/lib/types";

interface PropertyCardProps {
  property: IProperty;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl = property.images?.[0] || null;

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 hover:border-primary">
        {/* Image */}
        <div className="relative w-full h-48 bg-[background] shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Home className="w-12 h-12 text-muted-foreground/40" />
            </div>
          )}
          <span className="absolute top-2 left-2 px-2 py-1 text-[10px] font-bold uppercase rounded bg-primary text-white">
            {property.propertyType}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-heading font-bold text-sm text-foreground truncate">
            {property.title}
          </h3>

          {property.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          )}

          <div className="flex items-center gap-1 mt-1 text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="text-xs truncate">{property.location}</span>
          </div>

          {property.category && (
            <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-medium rounded bg-secondary/10 text-secondary self-start">
              {property.category.name}
            </span>
          )}

          {/* Spacer to push bottom content down */}
          <div className="flex-1" />

          {/* Price + Date */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-lg text-primary">
                ৳{property.price.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground">/month</span>
              </span>
              <span className="text-[10px] text-muted-foreground">
                Listed: {formatDate(property.createdAt)}
              </span>
            </div>

            {/* View Details Button */}
            <div className="mt-3 flex items-center justify-center h-9 px-4 bg-primary/10 text-primary text-xs font-bold rounded-md group-hover:bg-primary group-hover:text-white transition-colors">
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}