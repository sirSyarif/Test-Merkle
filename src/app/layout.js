"use client";
import ThemeConfig from "@/theme";
import { Provider } from "react-redux";

//component
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import store from "@/redux/store";
import "./globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeConfig>
            <main className="app-layout">
              <Sidebar>
                <Navbar />
                <main>{children}</main>
              </Sidebar>
              {/* <LoadingModal />
                  <SuccessModal />
                  <ErrorModal />
                  <Interceptor /> */}
            </main>
          </ThemeConfig>
        </Provider>
      </body>
    </html>
  );
}
