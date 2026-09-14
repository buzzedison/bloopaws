export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/", "/studio/", "/auth/"],
    },
    sitemap: "https://www.bloopglobal.com/sitemap.xml",
  };
}
