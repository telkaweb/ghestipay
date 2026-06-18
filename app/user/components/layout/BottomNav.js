"use client";

import {
  Home,
  Calculator,
  User,
  ClipboardList,
  Grid2X2,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/user/calculator", icon: Calculator, label: "محاسبه‌گر" },
    { href: "/user/requests", icon: ClipboardList, label: "درخواست‌ها" },
    { href: "/user/dashboard", icon: Home, label: "خانه", center: true },
    { href: "/user/services", icon: Grid2X2, label: "خدمات" },
    { href: "/user/profile", icon: User, label: "پروفایل" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-0 px-3">
      
      <nav className="w-full max-w-md">
        
        <div className="
          grid grid-cols-5
          items-end
          bg-white/80 backdrop-blur-xl
          border border-gray-200/60
          rounded-2xl
          shadow-lg
          h-16
          px-2
        ">

          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.center) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex flex-col items-center justify-center -translate-y-5"
                >
                  <div
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center
                      shadow-md transition active:scale-95
                      ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 border border-gray-200"
                      }
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  <span className="text-[10px] mt-1 text-gray-600">
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={index}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center gap-1 -translate-y-4
                  text-[11px] transition
                  ${isActive ? "text-blue-600" : "text-gray-500"}
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}

        </div>
      </nav>
    </div>
  );
}