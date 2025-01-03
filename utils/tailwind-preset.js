/**
 * TailwindCSS Configuration file.
 * This configuration includes custom themes, plugins, and extensions
 * for a blog application. It incorporates environmental variables,
 * color themes, font themes, and custom TailwindCSS plugins.
 */

const plugin = require('tailwindcss/plugin');
const pluginTypography = require('@tailwindcss/typography');
const { COLOR_THEMES, FONT_THEMES } = require('../themes');

// Environment variables for theme and fonts.
const THEME = process.env.BLOG_THEME || 'default';
const FONT_PRIMARY = process.env.BLOG_FONT_HEADINGS || 'sans-serif';
const FONT_SECONDARY = process.env.BLOG_FONT_BODY || 'sans-serif';

/**
 * Custom plugin to add a "hovered-sibling" variant.
 * 
 * This plugin enables styles for elements that are siblings of a hovered element.
 * For example, you can style a sibling component to change its appearance when the previous element is hovered.
 * 
 * Example usage:
 * ```css
 * .btn:hover + .hovered-sibling\:text-blue-500 {
 *   color: blue;
 * }
 * ```
 */
const hoveredSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant('hovered-sibling', ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:hover + .hovered-sibling\:${rule.selector.slice(1)}`;
    });
  });
});

/**
 * Custom plugin to compile and apply theme-specific CSS variables.
 * 
 * This plugin reads `COLOR_THEMES` and `FONT_THEMES` based on the selected environment variables.
 * It dynamically generates CSS variables for colors and fonts, allowing users to easily customize their themes.
 *
 * Users can further customize their themes by modifying the `COLOR_THEMES` and `FONT_THEMES` objects
 * in the `themes` module. Additional colors or font configurations can be added there.
 * 
 * Example `COLOR_THEMES` object:
 * ```javascript
 * const COLOR_THEMES = {
 *   default: {
 *     colors: {
 *       primary: '#000000',
 *       secondary: '#FFFFFF',
 *       gradient: '#FF5733',
 *     },
 *   },
 * };
 * ```
 */
const themesConfig = plugin(function ({ addComponents }) {
  const cssVars = {};

  // Extract color variables from the selected theme.
  Object.keys(COLOR_THEMES[THEME].colors).forEach((key) => {
    cssVars[`--color-${key}`] = `${COLOR_THEMES[THEME].colors[key]}`;
  });

  // Extract font variables from the selected theme.
  cssVars['--font-primary'] = FONT_THEMES[FONT_PRIMARY];
  cssVars['--font-secondary'] = FONT_THEMES[FONT_SECONDARY];

  const themeCompiled = {
    '.theme-compiled': cssVars,
  };

  // Add the compiled theme variables as components to TailwindCSS.
  addComponents(themeCompiled);
});

/**
 * TailwindCSS module export.
 * This file configures various aspects of TailwindCSS, including theme extensions,
 * custom variants, and plugins.
 */
module.exports = {
  theme: {
    /**
     * Extending the default TailwindCSS theme.
     * The `extend` property allows adding new styles or overriding the default ones without completely replacing them.
     * This ensures compatibility and reusability of TailwindCSS's core utilities.
     */
    extend: {
      backgroundImage: {
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'var(--color-primary)',
        'gradient-1': 'var(--color-gradient-1)',
        'gradient-2': 'var(--color-gradient-2)',
        'gradient-3': 'var(--color-gradient-3)',
        'gradient-4': 'var(--color-gradient-4)',
      },
      fonts: {
        primary: 'var(--font-primary)',
        secondary: 'var(--font-secondary)',
      },
      theme: {
        idk: {
          colors: {
            primary: '#FF8585',
            'gradient-1': '#7d7aff',
            'gradient-2': '#2121E2',
            'gradient-3': '#FF76B8',
            'gradient-4': '#001AFF',
          },
        },
      },
      typography(theme) {
        return {
          dark: {
            css: {
              color: theme('colors.gray.300'),
              '[class~="lead"]': { color: theme('colors.gray.400') },
              a: { color: theme('colors.gray.100') },
              strong: { color: theme('colors.gray.100') },
              'ul > li::before': { backgroundColor: theme('colors.gray.700') },
              hr: { borderColor: theme('colors.gray.800') },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.800'),
              },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
              h4: { color: theme('colors.gray.100') },
              code: { color: theme('colors.gray.100') },
              'a code': { color: theme('colors.gray.100') },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.gray.100'),
                borderBottomColor: theme('colors.gray.700'),
              },
              'tbody tr': { borderBottomColor: theme('colors.gray.800') },
            },
          },
        };
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      borderWidth: ['last', 'hovered-sibling'],
      typography: ['dark'],
    },
  },
  plugins: [
    /**
     * hoveredSiblingPlugin: Adds a `hovered-sibling` variant for targeting sibling elements.
     * pluginTypography: Provides TailwindCSS typography styles for enhanced text rendering.
     * themesConfig: Dynamically compiles and applies CSS variables for color and font themes.
     */
    hoveredSiblingPlugin,
    pluginTypography,
    themesConfig
  ],
};
