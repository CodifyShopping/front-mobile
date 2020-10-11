import { PixelRatio } from 'react-native';
const scaleFont = size => size * PixelRatio.getFontScale();

// FONT FAMILY
//poppins
export const FONT_REGULAR_POP = 'Poppins_400Regular';
export const FONT_SEMI_POP = 'Poppins_600SemiBold';
export const FONT_BOLD_POP = 'Poppins_700Bold';
//montserrat
export const FONT_SEMI_MONT = 'Montserrat_600SemiBold';
export const FONT_BOLD_MON = 'Montserrat_700Bold';

// FONT SIZE
//codify icon
export const huge = scaleFont(46);
export const xl = scaleFont(28);
export const l = scaleFont(26);
export const m = scaleFont(24);
export const s = scaleFont(22);
export const xs = scaleFont(20);
export const xxs = scaleFont(18);


