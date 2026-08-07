"use client";

import { Star } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";
import type { Testimonial } from "@/lib/types";

// const fallbackTestimonials: Testimonial[] = [
//   {
//     id: "t1",
//     quote: "Finding an apartment in Gulshan without dealing with unauthorized media brokers used to be impossible. Through Thikana, I inspected the verified floor plan online and moved in within 4 days.",
//     rating: 5,
//     name: "Tanvir Ahmed",
//     role: "Tenant, Gulshan 2, Dhaka",
//     avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
//     badge: "TENANT VOICE",
//   },
//   {
//     id: "t2",
//     quote: "As a landlord with 3 flats in Dhanmondi, managing tenant applications and verifying NID identity was always stressful. Thikana lets me approve genuine requests and receive rent deposits securely.",
//     rating: 5,
//     name: "Engr. Masud Alam",
//     role: "Landlord, 3 Properties",
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
//     badge: "LANDLORD VOICE",
//   },
//   {
//     id: "t3",
//     quote: "The BDT pricing transparency and gas type specifications (Titas Gas connection vs Cylinder LPG) saved us so much time. We found our family apartment in Chattogram smoothly.",
//     rating: 5,
//     name: "Nusrat Jahan",
//     role: "Tenant, Nasirabad, Chattogram",
//     avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
//     badge: "TENANT VOICE",
//   },
// ];

interface TestimonialsProps {
  reviews?: Testimonial[];
}

export function Testimonials({ reviews = [] }: TestimonialsProps) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-[background]">
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
          {testimonials.map((item) => (
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
    </section>
  );
}