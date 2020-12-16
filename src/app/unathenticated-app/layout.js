import * as React from 'react';
import { alpha, Box, hexToRgb, useTheme } from '@material-ui/core';
import hero from 'images/hero.jpg';

/**
 * Layout with background image
 */
function Layout({ children }) {
  return (
    <BackgroundImage>
      <Box
        sx={{
          minHeight: '100vh',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </Box>
    </BackgroundImage>
  );
}

/**
 * Clones child component and adds a background image styles.
 */
function BackgroundImage({ children }) {
  const { light, dark } = useTheme().palette.primary;

  const lightRgb = hexToRgb(light);
  const darkRgb = hexToRgb(dark);

  return (
    <Box
      clone
      sx={{
        background: `
          linear-gradient(
            to right bottom, 
            ${alpha(lightRgb, 0.3)}, 
            ${alpha(darkRgb, 0.8)}), 
          url(${hero})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </Box>
  );
}

export { Layout };
