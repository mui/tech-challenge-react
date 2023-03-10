import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';

export default function Home() {
  return (
    <BrandingCssVarsProvider>
      <Container>
        <Typography component="h1" variant="h2" sx={{ mt: 8 }}>
          ⚛ Technical challenge @ Material-UI
        </Typography>
        <Typography component="h2" variant="h3" sx={{ mt: 3, mb: 1 }}>
          First phase
        </Typography>
        <Link href="/components/phase1/">Load the page</Link>
        <Typography component="h2" variant="h3" sx={{ mt: 3, mb: 1 }}>
          Second phase
        </Typography>
        <Link href="/material-ui/react-autocomplete/">Load the page</Link>
      </Container>
    </BrandingCssVarsProvider>
  );
}
