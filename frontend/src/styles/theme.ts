import type { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#e75480', // Soft pink
    white: '#fff',
    lightPink: '#fdf6f9', // Light pink background
    darkGray: '#2d3748', // Dark gray text
    // Add other colors as needed for contrast and variations
    gray: '#a0aec0', // A general gray for borders, etc.
    lightGray: '#edf2f7', // Very light gray for subtle backgrounds
    red: '#e53e3e', // For error messages
    green: '#38a169', // For success messages
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xLarge: '1.5rem',
    xxLarge: '2rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  transitions: {
    easeOut: 'all 0.2s ease-out',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export default theme;

// Extend styled-components' DefaultTheme
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      danger: Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, never>>;
      primary: string;
      white: string;
      lightPink: string;
      darkGray: string;
      gray: string;
      lightGray: string;
      red: string;
      green: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
      xLarge: string;
      xxLarge: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    transitions: {
      easeOut: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
