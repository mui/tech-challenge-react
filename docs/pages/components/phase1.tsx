import * as React from 'react';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import Container from '@material-ui/core/Container';
// You can use this dataset for the component
import ComboBoxWidget from './ComboBoxWidget';

/**
 * You can render this page with:
 * yarn docs:dev && open http://0.0.0.0:3003/components/phase1/
 */

const styles = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'start',
  margin: '0 auto',
  padding: '30px 0',
};
export default function LandingPage() {
  return (
    <BrandingRoot>
      <Container style={styles}>
        <ComboBoxWidget />
      </Container>
    </BrandingRoot>
  );
}
