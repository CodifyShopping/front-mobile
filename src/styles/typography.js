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
export const FONT_SIZE_46 = scaleFont(46);

export const FONT_SIZE_36 = scaleFont(36);
export const FONT_SIZE_34 = scaleFont(34);
export const FONT_SIZE_32 = scaleFont(32);
export const FONT_SIZE_30 = scaleFont(30);
export const FONT_SIZE_28 = scaleFont(28);
export const FONT_SIZE_26 = scaleFont(26);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_22 = scaleFont(22);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);

