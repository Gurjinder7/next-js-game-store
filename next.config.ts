import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: "standalone"
};

export default nextConfig;

//standalone: includes only necessary file, needs additional imports for static, public
// export: for fully static build and deployment, no SSR included