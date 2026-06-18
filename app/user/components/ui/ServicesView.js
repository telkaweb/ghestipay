"use client";

import GridView from "@/shared/components/ui/GridView";
import ServiceCard from "@/shared/components/ui/ServiceCard";

import { BadgeCheck, FileSignature, Receipt, Smartphone } from "lucide-react";

const ServicesView = () => {
  return (
    <GridView columns={4}>
      <ServiceCard icon={BadgeCheck} title="اعتبارسنجی" href="/user/credit-score" />

      <ServiceCard
        icon={FileSignature}
        title="امضای دیجیتال"
        href="/digital-signature"
      />

      <ServiceCard icon={Receipt} title="قبض" href="/bill" />

      <ServiceCard icon={Smartphone} title="شارژ" href="/topup" />
    </GridView>
  );
};

export default ServicesView;
