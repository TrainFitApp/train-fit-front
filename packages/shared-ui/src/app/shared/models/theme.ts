export enum Theme {
  dark = 'dark',
  light = 'light',
}

export const THEMES = {
  dark: {
    id: Theme.dark,
  },
  light: {
    id: Theme.light,
  },
} as const;
