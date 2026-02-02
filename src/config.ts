export const SITE = {
  website: "https://datdiego.github.io/",
  author: "Diego Alducin, Ph.D.",
  profile: "https://datdiego.github.io/",
  desc: "Senior Data Scientist sharing insights on machine learning, AI systems, and data science.",
  title: "Diego Alducin",
  ogImage: "og-image.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/datdiego/datdiego.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "America/Chicago", // San Antonio, TX timezone
} as const;
