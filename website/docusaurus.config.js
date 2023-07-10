module.exports = {
  title: "React Native Hardwired",
  tagline:
    "You can now simply download React Native components from web or database sources during runtime, eliminating the need for bundle rebuilds.",
  url: "https://hardwired.coobers.com",
  baseUrl: "/",
  favicon: "assets/img/favicon.png",
  organizationName: "JedrzejMajko",
  projectName: "react-native-hardwired",
  staticDirectories: ["static"],
  scripts: [
    {
      src: "https://buttons.github.io/buttons.js",
      async: true,
      defer: true,
    },
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: "Hardwired Logo",
        src: "/img/logo.png",
      },
      items: [
        {
          to: "/",
          activeBasePath: "hello",
          label: "Home",
          position: "right",
        },
        {
          to: "#author",
          activeBasePath: "about",
          label: "About me",
          position: "right",
        },
      ],
    },
    colorMode: {
      disableSwitch: true,
    },
    trailingSlash: false,
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        theme: {
          customCss: require.resolve("./src/scss/application.scss"),
        },
        blog: {
          blogTitle: "Tutorials and articles about Eightshift development kit",
          blogDescription:
            "Tutorials and articles about Eightshift development kit",
          blogSidebarTitle: "Latest posts",
          showReadingTime: true,
          postsPerPage: 6,
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
      },
    ],
  ],
  plugins: ["docusaurus-plugin-sass"],
  customFields: {
    keywords: ["react native tools"],
  },
};
