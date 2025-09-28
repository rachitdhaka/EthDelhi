import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
// Import necessary hooks from wagmi
import { useAccount, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NAV_ITEMS = [
  { label: "Borrow", path: "/borrow" },
  { label: "Lend", path: "/lend" },
  { label: "Register RWA", path: "/register-asset" },
];

export function Header() {
  // Get wallet address and connection status from wagmi
  const { address, isConnected } = useAccount();
  // Get the signMessage function from wagmi
  const { signMessageAsync } = useSignMessage();

  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use a ref to ensure the sign-in flow only runs once per connection
  const signInAttemptedRef = useRef(false);

  // This useEffect handles the entire authentication flow
  useEffect(() => {
    const handleSignIn = async () => {
      // Don't proceed if we don't have an address or have already tried signing in
      if (!address || signInAttemptedRef.current) return;

      // Mark that we are attempting to sign in to prevent duplicate pop-ups
      signInAttemptedRef.current = true;

      try {
        // 1. Get wallet address (already available from `useAccount`)
        console.log("Step 1: Wallet connected with address:", address);

        // 2. Request nonce from your backend
        console.log("Step 2: Requesting nonce from backend...");
        const nonceResponse = await fetch("http://localhost:3000/api/auth/request-nonce", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress: address }),
        });
        const { nonce } = await nonceResponse.json();
        if (!nonce) throw new Error("Failed to retrieve nonce from backend.");

        // 3. Prompt user to sign the nonce
        console.log("Step 3: Prompting user to sign the nonce...");
        const signature = await signMessageAsync({
          message: `Login nonce: ${nonce}`,
        });

        // 4. Send signature to backend for verification and get JWT
        console.log("Step 4: Verifying signature with backend...");
        const verifyResponse = await fetch(
          "http://localhost:3000/api/auth/verify-signature",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ walletAddress: address, signature }),
          }
        );
        const { token } = await verifyResponse.json();
        if (!token) throw new Error("Signature verification failed.");

        console.log("✅ Authentication successful! JWT Token:", token);
        localStorage.setItem("walletAddress", address);

        // --- Store the JWT token for session management ---
        // You can use localStorage, sessionStorage, or context
        localStorage.setItem("authToken", token);

        // Handle redirection after successful authentication
        if (location.pathname !== "/register-asset") {
          navigate("/register-asset");
        }
      } catch (error) {
        console.error("Authentication process failed:", error);
        // On failure, reset the ref to allow the user to try again
        signInAttemptedRef.current = false;
      }
    };

    // Trigger the sign-in flow if the user is connected but not yet authenticated
    if (isConnected && address) {
      // Check for an existing token to avoid re-authenticating on every page load
      const existingToken = localStorage.getItem("authToken");
      if (!existingToken) {
        handleSignIn();
      }
    } else {
      // If the user disconnects, reset the sign-in attempt flag
      signInAttemptedRef.current = false;
      // Optional: You might want to clear the auth token on disconnect
      localStorage.removeItem('authToken');
    }
  }, [isConnected, address, signMessageAsync, navigate, location.pathname]);

  useEffect(() => {
    // Close mobile menu on page navigation
    setIsMenuOpen(false);
  }, [location.pathname]);

  const renderNavLink = (item: (typeof NAV_ITEMS)[number]) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`text-sm font-medium transition-colors ${
          isActive
            ? "text-blue-700 border-b-2 border-blue-700"
            : "text-gray-600 hover:text-blue-700"
        } px-1 py-1`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-semibold text-blue-700">
              AssetForge
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {NAV_ITEMS.map(renderNavLink)}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ConnectButton />
            </div>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-700"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 flex justify-center">
              <ConnectButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
