"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqsData = [
  {
    id: "faq-1",
    question:
      "How does the rental request and approval process work on RentNest?",
    answer:
      "Tenants browse verified property listings and submit an online request specifying their preferred move-in date and tenant profile. The landlord receives an instant alert in their dashboard to review the tenant's details and approve or decline the request.",
  },
  {
    id: "faq-2",
    question:
      "How does payment security work when paying rent or security deposits?",
    answer:
      "All online reservation fees, security deposits, and initial rent installments are processed securely through Stripe. Funds are held safely and documented with digital invoices before being disbursed to the landlord upon confirmed key handover.",
  },
  {
    id: "faq-3",
    question: "How can I list my property as a landlord?",
    answer:
      'Landlords can click the "List Property" button in the navigation bar to register their property. You can upload photos, specify BDT monthly rent, set gas connection details (Titas Gas connection or Cylinder LPG), specify generator backup, and indicate tenant preferences.',
  },
  {
    id: "faq-4",
    question: "What happens if a rental request is rejected by the landlord?",
    answer:
      "If a request is declined, the tenant is notified immediately via SMS and email. Any pre-authorized holding deposit is refunded instantly to the original payment method without deduction fees.",
  },
  {
    id: "faq-5",
    question: "How do tenant and landlord reviews work?",
    answer:
      "To maintain a trustworthy marketplace in Bangladesh, reviews can only be left by verified tenants and landlords after a lease contract or tour is completed. Both parties can rate communication, property accuracy, and payment timeliness.",
  },
  {
    id: "faq-6",
    question:
      "Are utility charges like gas, water, and service charge included in the monthly rent?",
    answer:
      "Each property blueprint explicitly lists whether service charges (lift/security guard fee) and utility connections (Titas gas, WASA water, DESCO/DPDC prepaid electricity) are included or billed separately in BDT.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#D8DBD3] bg-[#F4F5F1]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="font-mono-spec text-xs text-[#C98A2C] font-semibold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#1F4D3E]" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1B211E]">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-xs sm:text-sm text-[#1B211E]/80 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about renting homes, landlord
            verification, and secure BDT transactions.
          </p>
        </div>

        <div className="pt-2 w-full space-y-2">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-[#D8DBD3]">
                <button
                  onClick={() => toggle(faq.id)}
                  className="flex flex-1 items-center justify-between w-full py-4 text-left text-sm sm:text-base font-heading font-semibold transition-all hover:text-[#1F4D3E] group"
                  style={{ color: isOpen ? "#1F4D3E" : "#1B211E" }}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-[#1F4D3E] transition-transform duration-200 ml-4"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-200"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pb-4 pt-0 text-xs sm:text-sm text-[#1B211E]/80 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
