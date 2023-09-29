import '@emotion/react';
import { TypeOfPalette, TypeOfTypo, TypeOfFilter } from './theme';

declare module '@emotion/react' {
  export type Theme = {
    palette: TypeOfPalette;
    typo: TypeOfTypo;
    filter: TypeOfFilter;
  };
}
