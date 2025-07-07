export function getSubdomain(host) {
  host = host?.split(":")[0] || "";

  // Handle Vercel deploy: subdomain-project.vercel.app
  if (host.endsWith(".vercel.app")) {
    const subdomainPart = host.replace(".vercel.app", "");
    // If your pattern is datalabs-weld, extract datalabs (before first dash)
    if (subdomainPart.includes("-")) {
      return subdomainPart.split("-")[0];
    }
    // If your pattern is datalabs.vercel.app, just use the whole part
    return subdomainPart;
  }

  // Fallback for other domains (holbox.ai)
  if (host.endsWith(".holbox.ai")) {
    const parts = host.replace(".holbox.ai", "").split(".");
    if (parts.length === 1 && parts[0] === "holbox") return null;
    return parts.join(".");
  }

  // Localhost/dev fallback
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return "demo";
  }

  return null;
}
