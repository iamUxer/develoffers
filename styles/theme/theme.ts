import { Theme } from '@emotion/react';
import { palette } from './palette';
import { typo } from './typo';
import { filter } from './filter';

export const theme: Theme = {
  palette,
  typo,
  filter,
};

export type TypeOfPalette = typeof palette;
export type KeyOfPalette = keyof typeof palette;

export type KeyofTheme = keyof typeof theme;

export type TypeOfTypo = typeof typo;
export type KeyOfTypo = keyof typeof typo;

export type TypeOfFilter = typeof filter;
export type KeyOfFilter = keyof typeof filter;

export type TextType = {
  typo: KeyOfTypo;
  color: KeyOfPalette;
};
