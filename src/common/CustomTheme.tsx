import React from 'react';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { grey, lightBlue, blue, orange, green, red, indigo, cyan, lime, purple, amber, lightGreen, blueGrey, deepOrange, brown, teal } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Palette {
        railBackground: Palette['primary'];
        railColor: Palette['primary'];
        railIconColorSeries: Palette['primary'][];
    }
    interface PaletteOptions {
        railBackground?: PaletteOptions['primary'];
        railColor?: PaletteOptions['primary'];
        railIconColorSeries?: (PaletteOptions['primary'])[];
    }
}

export type ColorMode = PaletteMode | 'system';

export interface CustomThemeOptions {
    railMode?: ColorMode;
    uiMode?: ColorMode;
}

export default function useCustomTheme(options: CustomThemeOptions = { railMode: 'light', uiMode: 'light' }, theme: ThemeOptions = {}) {
    let { railMode, uiMode } = options;

    const systemDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const systemMode: PaletteMode = systemDarkMode ? 'dark' : 'light';
    const finalUIMode: PaletteMode = (uiMode || 'system') === 'system' ? systemMode : uiMode as PaletteMode;
    railMode = (railMode || 'system') === 'system' ? systemMode : railMode as PaletteMode;

    const darkRail = {
        palette: {
            railBackground: {
                main: grey[800],
            },
            railColor: {
                //light: green[400],
                //light: lightBlue[400],
                light: '#fff',
                //light: grey[50],
                main: grey[400],
            },
            railIconColorSeries: [{
                main: blue[500],
            }, {
                main: cyan[500],
            }, {
                main: orange[500],
            }, {
                main: red[500],
            }, {
                main: green[500],
            }, {
                main: lime[500],
            }, {
                main: purple[400],
            }, {
                main: indigo[400],
            }, {
                main: amber[500],
            }, {
                main: lightGreen[500],
            }, {
                main: blueGrey[500],
            }, {
                main: deepOrange[500],
            }, {
                main: brown[500],
            }, {
                main: teal[500],
            }],
        }
    };

    const lightRail = {
        palette: {
            railBackground: {
                main: grey[200],
            },
            railColor: {
                //light: green[700],
                light: lightBlue[700],
                //light: grey[900],
                main: grey[700],
            },
            railIconColorSeries: [{
                main: blue[500],
            }, {
                main: cyan[500],
            }, {
                main: orange[500],
            }, {
                main: red[500],
            }, {
                main: green[500],
            }, {
                main: lime[500],
            }, {
                main: purple[400],
            }, {
                main: indigo[400],
            }, {
                main: amber[500],
            }, {
                main: lightGreen[500],
            }, {
                main: blueGrey[500],
            }, {
                main: deepOrange[500],
            }, {
                main: brown[500],
            }, {
                main: teal[500],
            }],
        }
    };

    const railTheme = railMode === 'dark' ? darkRail : lightRail;

    return React.useMemo(() =>
        createTheme({
            ...railTheme,
            ...theme,
            palette: {
                ...railTheme.palette,
                ...theme.palette,
                mode: finalUIMode,
            }
        }),
        [finalUIMode, theme, railTheme],
    );
}
