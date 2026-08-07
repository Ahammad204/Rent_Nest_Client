"use client";

import { Star } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";
import type { Testimonial } from "@/lib/types";


interface TestimonialsProps {
  reviews?: Testimonial[];
}

export function Testimonials({ reviews = [] }: TestimonialsProps) {


  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-[background]">
      {reviews.length > 0 ? (
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
              COMMUNITY REVIEWS
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Trusted by Renters & Property Owners
            </h2>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
              Real feedback from verified tenants and property owners across Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((item) => (
              <BlueprintCard key={item.id} className="p-5 flex flex-col justify-between" accentTick>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-secondary">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-mono-spec text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20 font-bold">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                    “{item.quote}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full border border-border object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xs">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-heading font-bold text-xs text-foreground">
                      {item.name}
                    </div>
                    <div className="font-mono-spec text-[10px] text-primary font-medium">
                      {item.role}
                    </div>
                  </div>
                </div>
              </BlueprintCard>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          No reviews yet. Be the first to share your experience!
        </p>
      )}

    </section>
  );
}