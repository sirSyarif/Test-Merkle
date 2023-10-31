"use client";
import { useEffect } from "react";
import ThemeConfig from "@/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

//component
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { LoadingModal, ErrorModal, SuccessModal } from "@/components/Modal";

import store from "@/redux/store";
import "./globals.scss";

// custom rule for react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 5,
      retryDelay: (attemptIndex) => Math.min(5000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 1000,
    },
  },
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuth = pathname.includes("login");

  useEffect(() => {
    window.scroll(0, 0);
    if (typeof window !== "undefined" && !isAuth) {
      const user = localStorage.getItem("user-merkle");
      if (!user) {
        router.push("/login");
      }
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ThemeConfig>
              <main className="app-layout">
                {isAuth ? (
                  <main>{children}</main>
                ) : (
                  <Sidebar>
                    <Navbar />
                    <main>{children}</main>
                  </Sidebar>
                )}
                <LoadingModal />
                <ErrorModal />
                <SuccessModal />
              </main>
            </ThemeConfig>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
