"use client";

import GridView from "@/shared/components/ui/GridView";
import ServiceCard from "@/shared/components/ui/ServiceCard";
import {
  BadgeCheck,
  FileSignature,
  Receipt,
  Smartphone,
} from "lucide-react";

const services = [
  {
    title: "اعتبارسنجی",
    description: "بررسی وضعیت اعتبار",
    href: "/user/credit-score",
    icon: BadgeCheck,
    accent: "blue",
  },
  {
    title: "امضای دیجیتال",
    description: "ثبت و تایید قرارداد",
    href: "/digital-signature",
    icon: FileSignature,
    accent: "violet",
  },
  {
    title: "قبض",
    description: "پرداخت خدمات شهری",
    href: "/bill",
    icon: Receipt,
    accent: "emerald",
  },
  {
    title: "شارژ",
    description: "خرید شارژ و بسته",
    href: "/topup",
    icon: Smartphone,
    accent: "amber",
  },
];

const ServicesView = () => {
  return (
    <section className="mt-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-zinc-900">
          خدمات و ابزارها
        </h2>

        <span className="text-xs text-zinc-400">
          دسترسی سریع
        </span>
      </div>

      <GridView columns={2}>
        {services.map((service) => (
          <ServiceCard key={service.href} {...service} />
        ))}
      </GridView>
    </section>
  );
};

export default ServicesView;