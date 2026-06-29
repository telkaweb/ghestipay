"use client";

import { LogOut, Phone, UserRound } from "lucide-react";
import { useAuthStore } from "@/shared/stores/auth.store";
import { useAuth } from "@/shared/hooks/useAuth";

const ProfileInfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
      <Icon size={20} />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 wrap-break-word text-sm font-bold text-gray-900">
        {value || "ثبت نشده"}
      </p>
    </div>
  </div>
);

const Page = () => {
  const user = useAuthStore((s) => s.user);
  const {logout} = useAuth();
  
  const fullName = [user?.name, user?.family].filter(Boolean).join(" ");

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div className="flex flex-col gap-5 pt-6">
      <div className="space-y-2">
        <h1 className="text-lg font-black text-gray-900">پروفایل</h1>
        <p className="text-sm leading-6 text-gray-500">
          اطلاعات حساب کاربری شما
        </p>
      </div>

      <section className="space-y-3">
        <ProfileInfoItem
          icon={UserRound}
          label="نام و نام خانوادگی"
          value={fullName}
        />
        <ProfileInfoItem
          icon={Phone}
          label="شماره موبایل"
          value={user?.mobile}
        />
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition active:scale-[0.98]"
      >
        <LogOut size={18} />
        خروج از حساب کاربری
      </button>
    </div>
  );
};

export default Page;
