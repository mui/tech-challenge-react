import * as React from 'react';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// You can use this dataset for the component
import countries from './countries';
import ComboBox from './ComboBox';

/**
 * You can render this page with:
 * yarn docs:dev && open http://0.0.0.0:3002/components/phase1/
 */
export default function LandingPage() {
  return (
    <BrandingCssVarsProvider>
      <Container>
        <Typography component="h1" variant="h2" sx={{ mt: 8 }}>
          First phase
        </Typography>
        <ComboBox />
        <Typography variant="body2">
          <pre>{JSON.stringify(countries, null, 2)}</pre>
        </Typography>
      </Container>
    </BrandingCssVarsProvider>
  );
}
