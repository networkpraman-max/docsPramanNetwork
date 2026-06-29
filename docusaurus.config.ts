import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Praman Network Docs',
  tagline: 'Zero-Knowledge Biometric Identity Authentication',
  favicon: 'img/favicon.ico',

  url: 'https://docs.praman.network',
  baseUrl: '/',

  organizationName: 'praman-network',
  projectName: 'docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    async function tailwindPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Praman Docs',
      logo: {
        alt: 'Praman Network Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://praman.network',
          label: 'Ecosystem',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Developer Portal',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/installation',
            },
            {
              label: 'SDK Reference',
              to: '/docs/sdk-reference',
            },
          ],
        },
        {
          title: 'Infrastructure',
          items: [
            {
              label: 'Verify ZK API',
              to: '/docs/backend',
            },
            {
              label: 'Security Best Practices',
              to: '/docs/security',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'Website',
              href: 'https://praman.network',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Praman Network. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
