import ReactQueryProvider from "./providers/ReactQueryProvider";
import AuthHydrator from "@/shared/providers/AuthHydrator";
import "./globals.css";
import AuthGuard from "@/shared/providers/AuthGuard";

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body dir="rtl" className="bg-[#f6f7fb]">
        <ReactQueryProvider>
          <AuthHydrator>
            <AuthGuard>{children}</AuthGuard>
          </AuthHydrator>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
