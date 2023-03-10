import type { MuiPage, OrderedMuiPage } from 'docs/src/MuiPage';

const pages: readonly MuiPage[] = [
  {
    pathname: '/components',
    children: [
      { pathname: '/components/phase1', title: 'Phase 1' },
      { pathname: '/components/autocomplete' },
    ],
  },
];

export type { MuiPage, OrderedMuiPage };
export default pages;
