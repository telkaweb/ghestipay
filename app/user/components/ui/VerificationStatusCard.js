import { useAuthStore } from "@/shared/stores/auth.store";
import {
  ShieldCheck,
  BadgeCheck,
  FileSignature,
  CircleCheckBig,
  Clock3,
  CircleAlert,
  User,
  Phone,
} from "lucide-react";
import STATUS from "@/shared/constant/Status";

export default function VerificationStatusCard() {
  const user = useAuthStore((s) => s.user); // temporary fix for array response from /me

  // const { credit_score_status, digital_signature_status } = STATUS;

  return (
    <div
      dir="rtl"
      className="
        mt-3
        relative overflow-hidden
        rounded-3xl
        border border-gray-200
        bg-white/60
        backdrop-blur-xl
        shadow-lg

      "
    >
      {/* Background SVG */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        viewBox="0 0 400 200"
        fill="none"
      >
        <defs>
          <linearGradient
            id="verification-gradient"
            x1="0"
            y1="0"
            x2="400"
            y2="200"
          >
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        <circle cx="60" cy="40" r="80" fill="url(#verification-gradient)" />

        <circle cx="340" cy="170" r="90" fill="url(#verification-gradient)" />

        <path
          d="M0 120C50 70 120 180 200 120C280 60 350 140 400 90"
          stroke="url(#verification-gradient)"
          strokeWidth="3"
        />

        <path
          d="M0 150C80 90 150 200 240 140C300 100 350 120 400 110"
          stroke="url(#verification-gradient)"
          strokeWidth="2"
        />
      </svg>

      <div className="relative p-5">
        <h3 className="mb-5 text-sm font-semibold">وضعیت تکمیل حساب</h3>

        <div className="space-y-4">
          <StatusItem
            icon={<ShieldCheck size={20} />}
            title="احراز هویت"
            status={
              user?.kyc_status == "verified" ? "success" : "error"
            }
            text={
              user?.kyc_status == "verified"
                ? "تایید شده"
                : "تایید نشده"
            }
          />

          <StatusItem
            icon={<User size={20} />}
            title="نام و نام‌خانوادگی"
            status={user?.name ? 'success' : 'error'}
            text={user?.name ? `${user?.name} ${user?.family}` : ''}
          />

          <StatusItem
            icon={<Phone size={20} />}
            title="شماره تلفن"
            status={user?.mobile ? 'success' : 'error'}
            text={user?.mobile ? user.mobile : ''}
          />
        </div>
      </div>
    </div>
  );
}

function StatusItem({ icon, title, text, status }) {
  const styles = {
    success: {
      badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
      icon: <CircleCheckBig size={14} />,
    },

    pending: {
      badge: "bg-amber-50 text-amber-600 border-amber-200",
      icon: <Clock3 size={14} />,
    },

    error: {
      badge: "bg-red-50 text-red-600 border-red-200",
      icon: <CircleAlert size={14} />,
    },
  };

  return (
    <div className="flex items-center justify-between">
      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-2xl
            border border-white/50
            bg-white/70
            backdrop-blur-md
          "
        >
          {icon}
        </div>

        <span className="text-sm font-medium">{title}</span>
      </div>

      {/* Left Side */}
      <div
        className={`
          flex items-center gap-1.5
          rounded-full border
          px-3 py-1.5
          text-xs font-medium
          ${styles[status].badge}
        `}
      >
        {styles[status].icon}
        <span>{text}</span>
      </div>
    </div>
  );
}
