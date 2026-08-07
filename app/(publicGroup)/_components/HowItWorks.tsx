"use client";

const steps = [
  {
    number: "1",
    title: "Search & Filter",
    description: "Explore verified landlord listings with exact BDT rent pricing, Titas/LPG gas specs, and verified neighborhood blueprints.",
  },
  {
    number: "2",
    title: "Request & Tour",
    description: "Submit an online tour or rental request directly to the landlord with your preferred move-in date and tenant profile.",
  },
  {
    number: "3",
    title: "Approve & Move In",
    description: "Once approved, complete your initial deposit securely via Stripe and receive your keys hassle-free.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-border bg-[background]">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
            SIMPLE THREE-STEP PROCESS
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            How Thikana Works
          </h2>
          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
            Eliminating media fees and agent confusion with direct digital rentals for tenants and landlords.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center space-y-3 px-4">
              <div className="w-12 h-12 rounded-full bg-secondary text-white font-mono-spec font-bold text-lg flex items-center justify-center shadow-xs">
                {step.number}
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}