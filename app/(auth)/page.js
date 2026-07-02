"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const onboardingSteps = [
  {
    label: "امنیت",
    title: "با خیال راحت وارد شوید",
    description:
      "ورود به قسطی‌پی با شماره موبایل و کد یک‌بارمصرف انجام می‌شود؛ ساده، سریع و امن.",
    icon: ShieldCheck,
    color: "text-teal-600",
    bg: "bg-teal-50",
    scene: "login",
    illustration: IdentityVerificationIllustration
  },
  {
    label: "درخواست",
    title: "مراحل درخواست را شفاف ببینید",
    description:
      "مدارک، اطلاعات و وضعیت هر مرحله در یک مسیر مرتب نمایش داده می‌شود تا چیزی از قلم نیفتد.",
    icon: ClipboardCheck,
    color: "text-blue-600",
    bg: "bg-blue-50",
    scene: "request",
    illustration: RequestManagementIllustration
  },
  {
    label: "پرداخت",
    title: "پرداخت‌ها را یک‌جا مدیریت کنید",
    description:
      "بعد از ورود، وضعیت اعتبار، درخواست‌ها و پرداخت‌های اقساطی خود را در یک نگاه دنبال می‌کنید.",
    icon: CreditCard,
    color: "text-violet-600",
    bg: "bg-violet-50",
    scene: "payment",
    illustration: SecurePaymentIllustration
  },
];

 function SecurePaymentIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="spBgGlow" x1="70" y1="36" x2="340" y2="282" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" stopOpacity="0.16" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0.08" />
        </linearGradient>

        <linearGradient id="spCardGradient" x1="84" y1="78" x2="320" y2="246" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F4F4F5" />
        </linearGradient>

        <linearGradient id="spLockGradient" x1="270" y1="102" x2="338" y2="174" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>

        <filter id="spShadowLg" x="64" y="56" width="300" height="220" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="20" stdDeviation="22" floodColor="#18181B" floodOpacity="0.10" />
        </filter>

        <filter id="spShadowSm" x="252" y="88" width="112" height="112" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#10B981" floodOpacity="0.22" />
        </filter>
      </defs>

      <circle cx="106" cy="72" r="68" fill="#10B981" fillOpacity="0.06" />
      <circle cx="334" cy="248" r="64" fill="#3B82F6" fillOpacity="0.06" />
      <path
        d="M54 214C86 164 140 138 194 146C244 154 286 190 336 186"
        stroke="url(#spBgGlow)"
        strokeWidth="18"
        strokeLinecap="round"
      />

      <g filter="url(#spShadowLg)">
        <rect x="84" y="78" width="236" height="164" rx="28" fill="url(#spCardGradient)" />
        <rect x="84.75" y="78.75" width="234.5" height="162.5" rx="27.25" stroke="#E4E4E7" strokeWidth="1.5" />
      </g>

      <rect x="106" y="104" width="192" height="116" rx="24" fill="#18181B" />
      <rect x="106" y="126" width="192" height="18" fill="#27272A" />
      <rect x="124" y="166" width="34" height="24" rx="8" fill="#F4D38A" />
      <rect x="176" y="170" width="64" height="10" rx="5" fill="white" fillOpacity="0.92" />
      <rect x="176" y="188" width="42" height="8" rx="4" fill="white" fillOpacity="0.45" />

      <rect x="106" y="232" width="70" height="8" rx="4" fill="#10B981" fillOpacity="0.18" />
      <rect x="184" y="232" width="48" height="8" rx="4" fill="#18181B" fillOpacity="0.08" />

      <g filter="url(#spShadowSm)">
        <rect x="274" y="104" width="60" height="60" rx="20" fill="url(#spLockGradient)" />
      </g>

      <path
        d="M295 130V124C295 118.477 299.477 114 305 114C310.523 114 315 118.477 315 124V130"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="291" y="128" width="28" height="20" rx="8" fill="white" />
      <circle cx="305" cy="138" r="3.5" fill="#10B981" />

      <path
        d="M86 126C86 126 92 120 100 120"
        stroke="#10B981"
        strokeOpacity="0.3"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M320 198C320 198 328 190 338 190"
        stroke="#3B82F6"
        strokeOpacity="0.25"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <circle cx="82" cy="114" r="6" fill="#10B981" fillOpacity="0.18" />
      <circle cx="334" cy="90" r="5" fill="#3B82F6" fillOpacity="0.18" />
      <circle cx="346" cy="210" r="7" fill="#10B981" fillOpacity="0.16" />
    </svg>
  );
}

function OnboardingIllustration({ scene }) {
  return (
    <svg
      viewBox="0 0 320 260"
      role="img"
      aria-hidden="true"
      className="h-full w-full"
    >
      <rect x="32" y="24" width="256" height="212" rx="34" fill="#ffffff" />
      <rect x="56" y="48" width="208" height="164" rx="28" fill="#f8fafc" />
      <circle cx="84" cy="76" r="10" fill="#0f172a" />
      <rect x="104" y="69" width="74" height="10" rx="5" fill="#cbd5e1" />
      <rect x="56" y="184" width="208" height="28" rx="14" fill="#e2e8f0" />

      {scene === "login" && (
        <>
          <rect x="92" y="104" width="136" height="64" rx="20" fill="#ccfbf1" />
          <path
            d="M134 130v-12a26 26 0 0 1 52 0v12"
            fill="none"
            stroke="#0f766e"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <rect x="126" y="126" width="68" height="50" rx="16" fill="#0f766e" />
          <circle cx="160" cy="150" r="7" fill="#ffffff" />
          <path
            d="M160 156v10"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      )}

      {scene === "request" && (
        <>
          <rect x="88" y="96" width="144" height="94" rx="18" fill="#dbeafe" />
          <rect x="112" y="120" width="96" height="9" rx="4.5" fill="#2563eb" />
          <rect x="112" y="143" width="72" height="9" rx="4.5" fill="#93c5fd" />
          <rect x="112" y="166" width="88" height="9" rx="4.5" fill="#93c5fd" />
          <circle cx="222" cy="99" r="22" fill="#ffffff" />
          <path
            d="m212 99 7 7 14-17"
            fill="none"
            stroke="#2563eb"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {scene === "payment" && (
        <>
          <rect x="82" y="105" width="156" height="86" rx="22" fill="#ede9fe" />
          <rect x="104" y="130" width="112" height="12" rx="6" fill="#7c3aed" />
          <rect x="104" y="158" width="48" height="10" rx="5" fill="#a78bfa" />
          <circle cx="216" cy="171" r="26" fill="#ffffff" />
          <path
            d="M204 171h24M216 159v24"
            stroke="#7c3aed"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

 function RequestManagementIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="rmBgGlow" x1="70" y1="40" x2="340" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" stopOpacity="0.16" />
          <stop offset="1" stopColor="#06B6D4" stopOpacity="0.08" />
        </linearGradient>

        <linearGradient id="rmCardGradient" x1="88" y1="72" x2="314" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F4F4F5" />
        </linearGradient>

        <linearGradient id="rmBadgeGradient" x1="270" y1="100" x2="336" y2="170" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>

        <filter id="rmShadowLg" x="70" y="50" width="290" height="220" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="20" stdDeviation="22" floodColor="#18181B" floodOpacity="0.10" />
        </filter>

        <filter id="rmShadowSm" x="252" y="88" width="110" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#8B5CF6" floodOpacity="0.20" />
        </filter>
      </defs>

      <circle cx="105" cy="72" r="66" fill="#8B5CF6" fillOpacity="0.06" />
      <circle cx="336" cy="248" r="62" fill="#06B6D4" fillOpacity="0.06" />
      <path
        d="M56 214C88 168 140 144 194 150C242 156 282 188 332 184"
        stroke="url(#rmBgGlow)"
        strokeWidth="18"
        strokeLinecap="round"
      />

      <g filter="url(#rmShadowLg)">
        <rect x="88" y="74" width="228" height="168" rx="28" fill="url(#rmCardGradient)" />
        <rect x="88.75" y="74.75" width="226.5" height="166.5" rx="27.25" stroke="#E4E4E7" strokeWidth="1.5" />
      </g>

      <rect x="108" y="96" width="88" height="124" rx="22" fill="#FAFAFA" stroke="#E4E4E7" />
      <rect x="122" y="112" width="60" height="10" rx="5" fill="#18181B" fillOpacity="0.92" />
      <rect x="122" y="132" width="42" height="8" rx="4" fill="#A1A1AA" />

      <g>
        <rect x="122" y="156" width="18" height="18" rx="6" fill="#8B5CF6" fillOpacity="0.14" />
        <path d="M128 165L131.5 168.5L136 162.5" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="148" y="160" width="30" height="8" rx="4" fill="#D4D4D8" />
      </g>

      <g>
        <rect x="122" y="184" width="18" height="18" rx="6" fill="#06B6D4" fillOpacity="0.14" />
        <circle cx="131" cy="193" r="3.5" fill="#0891B2" />
        <rect x="148" y="188" width="24" height="8" rx="4" fill="#D4D4D8" />
      </g>

      <rect x="214" y="104" width="78" height="12" rx="6" fill="#18181B" fillOpacity="0.92" />
      <rect x="214" y="128" width="58" height="10" rx="5" fill="#A1A1AA" />

      <g>
        <rect x="214" y="154" width="84" height="16" rx="8" fill="#F4F4F5" />
        <rect x="214" y="154" width="62" height="16" rx="8" fill="#8B5CF6" fillOpacity="0.18" />
      </g>

      <g>
        <rect x="214" y="182" width="84" height="16" rx="8" fill="#F4F4F5" />
        <rect x="214" y="182" width="42" height="16" rx="8" fill="#06B6D4" fillOpacity="0.18" />
      </g>

      <rect x="214" y="212" width="52" height="10" rx="5" fill="#D4D4D8" />

      <g filter="url(#rmShadowSm)">
        <rect x="276" y="102" width="58" height="58" rx="18" fill="url(#rmBadgeGradient)" />
      </g>
      <path
        d="M293 131H305M305 131H317M305 131V119M305 131V143"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />

      <circle cx="84" cy="116" r="6" fill="#8B5CF6" fillOpacity="0.20" />
      <circle cx="332" cy="88" r="5" fill="#06B6D4" fillOpacity="0.20" />
      <circle cx="346" cy="208" r="7" fill="#8B5CF6" fillOpacity="0.14" />
    </svg>
  );
}

export default function AuthPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const step = onboardingSteps[activeStep];
  const StepIcon = step.icon;
  const isLastStep = activeStep === onboardingSteps.length - 1;

  const changeStep = (nextStep) => {
    if (nextStep === activeStep) return;

    setSlideDirection(nextStep > activeStep ? "next" : "prev");
    setActiveStep(nextStep);
  };

  const goNext = () => {
    changeStep(Math.min(activeStep + 1, onboardingSteps.length - 1));
  };

  const goBack = () => {
    changeStep(Math.max(activeStep - 1, 0));
  };

  return (
    <main className="min-h-screen bg-[#ffffff] text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white px-5 pb-6 pt-7 shadow-[0_0_60px_rgba(37,99,235,0.08)]">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-200">
              G
            </div>
            <div>
              <p className="text-sm font-bold">GhestiPay</p>
              <p className="text-xs text-slate-500">مدیریت خرید اقساطی</p>
            </div>
          </div>

          <Link
            href="/otp"
            className="text-xs font-semibold text-slate-500 transition hover:text-slate-950"
          >
            رد کردن
          </Link>
        </header>

        <div
          key={activeStep}
          className={`flex flex-1 flex-col justify-center ${
            slideDirection === "next" ? "slide-next" : "slide-prev"
          }`}
        >
          <div className="relative mx-auto mt-8 aspect-[1.2] w-full max-w-82.5">
            <div className={`absolute inset-8 rounded-[42px] ${step.bg}`} >
              <step.illustration />
            </div>
            <OnboardingIllustration scene={step.scene} />
          </div>

          <div className="mt-8">
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full ${step.bg} px-3 py-1.5 text-xs font-bold ${step.color}`}
            >
              <StepIcon className="h-4 w-4" />
              {step.label}
            </div>

            <h1 className="text-[28px] font-bold leading-[1.55] text-slate-950">
              {step.title}
            </h1>

            <p className="mt-4 min-h-21 text-sm leading-7 text-slate-600">
              {step.description}
            </p>
          </div>
        </div>

        <footer>
          <div className="mb-5 flex items-center justify-center gap-2">
            {onboardingSteps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`مرحله ${index + 1}`}
                onClick={() => changeStep(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeStep
                    ? "w-8 bg-slate-950"
                    : "w-2.5 bg-slate-200"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={activeStep === 0}
              aria-label="مرحله قبلی"
              className="inline-flex h-10 min-w-20 items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-slate-950 disabled:cursor-default disabled:opacity-30"
            >
              <ArrowRight className="h-5 w-5" />
              قبلی
            </button>

            {isLastStep ? (
              <Link
                href="/otp"
                className="inline-flex h-10 min-w-20 items-center justify-end gap-1.5 text-sm font-bold text-slate-950 transition hover:text-blue-600"
              >
                شروع
                <ArrowLeft className="h-5 w-5" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-10 min-w-20 items-center justify-end gap-1.5 text-sm font-bold text-slate-950 transition hover:text-blue-600"
              >
                ادامه
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
          </div>
        </footer>

        <style jsx>{`
          .slide-next {
            animation: slideInNext 820ms cubic-bezier(0.18, 0.88, 0.18, 1) both;
          }

          .slide-prev {
            animation: slideInPrev 820ms cubic-bezier(0.18, 0.88, 0.18, 1) both;
          }

          @keyframes slideInNext {
            from {
              opacity: 0;
              transform: translateX(-86px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInPrev {
            from {
              opacity: 0;
              transform: translateX(86px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </section>
    </main>
  );
}

 function IdentityVerificationIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bgGlow" x1="60" y1="40" x2="340" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" stopOpacity="0.18" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0.08" />
        </linearGradient>

        <linearGradient id="cardGradient" x1="88" y1="82" x2="300" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F4F4F5" />
        </linearGradient>

        <linearGradient id="shieldGradient" x1="274" y1="110" x2="338" y2="178" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>

        <filter id="shadowLg" x="70" y="55" width="280" height="220" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="20" stdDeviation="22" floodColor="#18181B" floodOpacity="0.10" />
        </filter>

        <filter id="shadowSm" x="250" y="88" width="110" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#10B981" floodOpacity="0.22" />
        </filter>
      </defs>

      <circle cx="110" cy="70" r="70" fill="#10B981" fillOpacity="0.06" />
      <circle cx="330" cy="250" r="64" fill="#3B82F6" fillOpacity="0.06" />
      <path
        d="M58 210C88 160 142 136 194 144C242 152 284 186 332 184"
        stroke="url(#bgGlow)"
        strokeWidth="18"
        strokeLinecap="round"
      />

      <g filter="url(#shadowLg)">
        <rect x="88" y="78" width="220" height="164" rx="28" fill="url(#cardGradient)" />
        <rect x="88.75" y="78.75" width="218.5" height="162.5" rx="27.25" stroke="#E4E4E7" strokeWidth="1.5" />
      </g>

      <rect x="110" y="102" width="84" height="116" rx="20" fill="#F4F4F5" />
      <circle cx="152" cy="138" r="22" fill="#D4D4D8" />
      <path
        d="M122 196C127.5 176 144.5 168 152 168C159.5 168 176.5 176 182 196"
        fill="#D4D4D8"
      />

      <rect x="212" y="110" width="68" height="12" rx="6" fill="#18181B" fillOpacity="0.92" />
      <rect x="212" y="134" width="56" height="10" rx="5" fill="#A1A1AA" />
      <rect x="212" y="156" width="74" height="10" rx="5" fill="#D4D4D8" />
      <rect x="212" y="178" width="48" height="10" rx="5" fill="#D4D4D8" />

      <rect x="110" y="228" width="92" height="8" rx="4" fill="#10B981" fillOpacity="0.18" />
      <rect x="208" y="228" width="54" height="8" rx="4" fill="#18181B" fillOpacity="0.08" />

      <g filter="url(#shadowSm)">
        <path
          d="M306 102L336 114V139C336 159 323 176 306 182C289 176 276 159 276 139V114L306 102Z"
          fill="url(#shieldGradient)"
        />
      </g>

      <path
        d="M295 140L303 148L318 130"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="88" cy="110" r="6" fill="#10B981" fillOpacity="0.22" />
      <circle cx="320" cy="84" r="5" fill="#3B82F6" fillOpacity="0.18" />
      <circle cx="340" cy="206" r="7" fill="#10B981" fillOpacity="0.16" />
    </svg>
  );
}
