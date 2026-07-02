// shared/components/layout/AppLayout.js

import SafeArea from "./SafeArea";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";
import PageContainer from "./PageContainer";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f6f7fb] flex justify-center">
      {/* کانتینر موبایل */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative overflow-hidden shadow-lg">
        <SafeArea>
          <AppHeader />
          <div className="h-16 shrink-0" aria-hidden="true" />

          {/* محتوا */}
          <PageContainer>{children}</PageContainer>

          <BottomNav />
        </SafeArea>
      </div>
    </div>
  );
}
