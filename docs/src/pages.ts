import findPages from /* preval */ 'docs/src/modules/utils/findPages';

export interface MuiPage {
  pathname: string;
  children?: MuiPage[];
  disableDrawer?: boolean;
  displayNav?: boolean;
  /**
   * Props spread to the Link component
   */
  linkProps?: Record<string, unknown>;
  subheader?: string;
  /**
   * Overrides the default page title.
   */
  title?: string;
}

const pages: MuiPage[] = [
  {
    pathname: '/components',
    children: [
      { pathname: '/components/phase1', title: 'Phase 1' },
      { pathname: '/components/autocomplete' },
    ],
  },
  {
    title: 'Component API',
    pathname: '/api-docs',
    children: [...findPages[0].children!]
      .sort((a, b) =>
        a.pathname.replace('/api-docs/', '').localeCompare(b.pathname.replace('/api-docs/', '')),
      )
      .map((page) => {
        return { ...page, linkProps: { as: page.pathname.replace(/^\/api-docs/, '/api') } };
      }),
  },
];

export default pages;
