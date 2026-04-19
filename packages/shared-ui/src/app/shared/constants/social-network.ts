export enum SOCIAL_NETWORK_TYPES {
  facebook = 0,
  instagram = 1,
  tiktok = 2,
  youtube = 3,
  twitter = 4,
}

export type SOCIAL_NETWORK_TYPE = {
  id: SOCIAL_NETWORK_TYPES;
  value: string;
  icon: string;
  url: string;
};

export const SOCIAL_NETWORKS: {
  [id: number]: SOCIAL_NETWORK_TYPE;
} = {
  [SOCIAL_NETWORK_TYPES.facebook]: {
    id: SOCIAL_NETWORK_TYPES.facebook,
    value: 'Facebook',
    icon: 'logo-facebook',
    url: 'https://www.facebook.com/TrainFitApp',
  },
  [SOCIAL_NETWORK_TYPES.instagram]: {
    id: SOCIAL_NETWORK_TYPES.instagram,
    value: 'Instagram',
    icon: 'logo-instagram',
    url: 'https://www.instagram.com/trainfit.app',
  },
  [SOCIAL_NETWORK_TYPES.tiktok]: {
    id: SOCIAL_NETWORK_TYPES.tiktok,
    value: 'TikTok',
    icon: 'logo-tiktok',
    url: 'https://www.tiktok.com/@trainfit.app',
  },
  [SOCIAL_NETWORK_TYPES.youtube]: {
    id: SOCIAL_NETWORK_TYPES.youtube,
    value: 'YouTube',
    icon: 'logo-youtube',
    url: 'https://www.youtube.com/channel/UCFf26-iHFEO6rcO7WHcU5Jg',
  },
  [SOCIAL_NETWORK_TYPES.twitter]: {
    id: SOCIAL_NETWORK_TYPES.twitter,
    value: 'X',
    icon: 'logo-x',
    url: 'https://x.com/TrainFit_App',
  },
} as const;

export const SOCIAL_NETWORK_VALUES = Object.values(SOCIAL_NETWORKS);
