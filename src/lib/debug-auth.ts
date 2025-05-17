
export function debugOAuthFlow() {
  console.log("=== OAuth Flow Debugging ===");

  // Log current URL and params
  console.log("Current URL:", window.location.href);

  const urlParams = new URLSearchParams(window.location.search);
  console.log("URL Parameters:", {
    state: urlParams.get("state"),
    code: urlParams.get("code"),
    error: urlParams.get("error"),
    callbackUrl: urlParams.get("callbackUrl"),
  });

  // Log stored auth mode
  console.log("Stored Auth Mode:", localStorage.getItem("googleAuthMode"));

  // Log environment variables (careful with sensitive info)
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Redirect URI:", process.env.NEXT_PUBLIC_REDIRECT_URI);

  // Check if the browser has blocked redirects
  console.log("Popup Blocked:", window.screenLeft === 0 && window.screenTop === 0);

  console.log("=== End Debugging ===");
}
