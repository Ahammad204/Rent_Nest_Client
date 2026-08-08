import Link from "next/link";
import Image from "next/image";
import { MapPin, Home, ArrowRight, Star } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";
import type { IProperty } from "@/lib/types";

interface RelatedPropertiesProps {
  properties: IProperty[];
}

export function RelatedProperties({ properties }: RelatedPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-10">
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
            SIMILAR LISTINGS
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Related Properties
          </h2>
          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
            Other verified rental properties in the same area.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => {
            const imageUrl = property.images?.[0] || null;
            return (
              <Link key={property.id} href={`/properties/${property.id}`}>
                <BlueprintCard className="h-full flex flex-col p-2 hover:shadow-md transition-all duration-200 hover:border-primary" accentTick>
                  {/* Image */}
                  <div className="relative w-full h-40 rounded overflow-hidden bg-[background]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Home className="w-10 h-10 text-muted-foreground/40" />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-1 text-[10px] font-bold uppercase rounded bg-primary text-white">
                      {property.propertyType}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-heading font-bold text-sm text-foreground truncate">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs truncate">{property.location}</span>
                    </div>

                    {/* Rating */}
                    {property.averageRating !== null && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= Math.round(property.averageRating!)
                                  ? "fill-secondary text-secondary"
                                  : "fill-none text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {property.averageRating!.toFixed(1)} ({property.reviewCount})
                        </span>
                      </div>
                    )}

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Price + CTA */}
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <span className="font-heading font-bold text-base text-primary">
                        ৳{property.price.toLocaleString()}
                        <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                      </span>
                      <span className="text-[10px] text-primary font-bold flex items-center gap-0.5 group-hover:gap-1 transition-all">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </BlueprintCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}