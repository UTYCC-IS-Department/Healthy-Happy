import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: "/:locale(en|my)/products/iron-enriched-cookies-1",
        destination: "/:locale/products/protein-bite-original/",
        permanent: true,
      },
      {
        source: "/:locale(en|my)/products/iron-enriched-cookies-2",
        destination: "/:locale/products/peanut-butter-no-sugar/",
        permanent: true,
      },
      {
        source: "/:locale(en|my)/products/iron-enriched-cookies-3",
        destination: "/:locale/products/iron-enriched-cookies/",
        permanent: true,
      },
      {
        source: "/:locale(en|my)/products/iron-enriched-cookies-4",
        destination: "/:locale/products/energy-bar/",
        permanent: true,
      },
      {
        source: "/:locale(en|my)/products/spinach-cookies-1",
        destination: "/:locale/products/spinach-cookies/",
        permanent: true,
      },
      {
        source: "/:locale(en|my)/products/spinach-cookies-2",
        destination: "/:locale/products/oat-cookies/",
        permanent: true,
      },
      {
        source: "/:locale(en|my)/products/nut-cookies-1",
        destination: "/:locale/products/cinnamon-cookies/",
        permanent: true,
      },
      {
        source: "/:locale(en|my)/products/nut-cookies-2",
        destination: "/:locale/products/beetroot-cookies/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
