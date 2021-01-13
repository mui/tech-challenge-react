import * as React from 'react';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';

export default function LandingPage() {
  return (
    <BrandingRoot>
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
        <Link href="/components/autocomplete/">Load the page</Link>
      </Container>
    </BrandingRoot>
  );
}
