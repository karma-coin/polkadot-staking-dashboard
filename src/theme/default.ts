// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AnyJson } from 'types';

const v = (light: string, dark: string) => ({
  light,
  dark,
});

export const defaultThemes: { [key: string]: AnyJson } = {
  text: {
    invert: v('#fafafa', '#0e0e0e'),
  },
  background: {
    dropdown: v('rgba(237,237,237,0.6)', 'rgba(33,33,33,0.6)'),
    modalitem: v('rgba(244,244,244,0.6)', 'rgba(22,22,22,0.4)'),
    tag: v('rgba(220,220,220,0.75)', 'rgba(36,36,36,0.75)'),
    identicon: v('#eee', '#333'),
    overlay: v(
      'linear-gradient(180deg, rgba(244,242,242,0.93) 0%, rgba(228,225,225,0.93) 100%)',
      'linear-gradient(180deg, rgba(20,20,20,0.93) 0%, rgba(14,14,14,0.93) 100%)'
    ),
    submission: v('rgba(245,244,244,1)', '#141414'),
  },
  highlight: {
    primary: v(
      'linear-gradient(90deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.03) 100%)',
      'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)'
    ),
    secondary: v(
      'linear-gradient(90deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 100%)',
      'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
    ),
  },
  graphs: {
    colors: [v('#ccc', '#555'), v('#eee', '#222')],
    inactive: v('#cfcfcf', '#1a1a1a'),
    inactive2: v('#dadada', '#383838'),
    tooltip: v('#333', '#ddd'),
    grid: v('#e8e8e8', '#222'),
  },
  buttons: {
    primary: { background: v('rgba(244, 243, 243, 0.9)', '#1a1a1a') },
    secondary: { background: v('#eeecec', '#333') },
    toggle: { background: v('rgba(242,241,240,1)', '#1d1d1d') },
    help: { background: v('#ececec', '#242424') },
    hover: { background: v('#e8e6e6', '#080808') },
    disabled: {
      background: v('#F3F6F4', '#000000'),
      text: v('#ececec', '#444444'),
    },
  },
  border: {
    secondary: v('#ccc', '#444'),
  },
  loader: {
    foreground: v('#e1e1e1', '#151515'),
    background: v('#dadada', '#101010'),
  },
  shadow: {
    primary: v('#dedede', '#1f1f1f'),
    secondary: v('#eaeaea', '#222'),
  },
};
