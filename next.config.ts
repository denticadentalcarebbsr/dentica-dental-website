import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "urhrqzrymtsoxcwirjrk.supabase.co" },
    ],
  },
};

export default nextConfig;
