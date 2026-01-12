"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I register for the mess?",
    answer:
      "Students can register directly through the portal using their roll number and email. Once registered, you'll need approval from the warden to start booking meals.",
  },
  {
    question: "Can I cancel a meal I've already booked?",
    answer:
      "Yes, meals can be cancelled up to 4 hours before the serving time. Credits" +
      " will be refunded to your account automatically.",
  },
  {
    question: "How does the QR code attendance work?",
    answer:
      "Each approved meal booking generates a unique QR code in your dashboard. Show this code to the mess staff at the counter to get your meal served.",
  },
  {
    question: "What if I have special dietary requirements?",
    answer:
      "You can update your dietary preferences in your profile settings. The monthly menu also indicates allergens and food types (Veg/Non-Veg/Jain).",
  },
  {
    question: "How can I provide feedback on the food?",
    answer:
      "We value your feedback! You can rate each meal and submit comments directly through the 'Feedback' section in your student dashboard.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg px-6 py-4 bg-card hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
