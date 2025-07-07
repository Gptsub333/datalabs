import Loader from "../components/Loader";
import ClientLayout from "./client-layout";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { AuthProvider } from "../context/AuthContext";
import { OrganizationProvider } from "../context/OrganizationContext";  // Import OrganizationContext
import { headers, cookies } from "next/headers";
import { getSubdomain } from "../utils/getSubdomain";

export const metadata = {
  title: "Agentic AI Demo Interface",
  description: "Premium AI features showcase with modern design",
  generator: "Holbox.ai.dev",
};

export default async function RootLayout({ children }) {
  // 1. Get subdomain from headers
  const headersList = await headers();
  const host = headersList.get("host");
  const subdomain = getSubdomain(host);
  if (!subdomain && (host === "localhost" || host === "127.0.0.1")) {
    // fallback: get org from cookie, param, or default
    subdomain = "demo";
  }

  // 2. Fetch organization data from your backend
  let organization = null;
  if (subdomain) {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/api/organization/by-subdomain/${subdomain}`,
        { cache: "no-store" }
      );
      if (res.ok) organization = await res.json();
    } catch (err) {
      // fallback: organization = null
    }
  }

  // 3. Provide organization context to all children (including ClientLayout etc)
  return (
    <html lang="en">
      <body>
        <OrganizationProvider value={organization || {}}>
          <ClerkProvider>
            <AuthProvider>
              <SignedOut>
                <div className="min-w-screen min-h-screen flex items-center justify-center ">
                  <SignIn routing="hash" />
                </div>
              </SignedOut>
              <SignedIn>
                <ClientLayout>{children}</ClientLayout>
              </SignedIn>
            </AuthProvider>
          </ClerkProvider>
        </OrganizationProvider>
      </body>
    </html>
  );
}
