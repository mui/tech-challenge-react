import pagesApi from 'docs/data/material/pagesApi';
import { MuiPage } from 'docs/src/MuiPage';

const pages: MuiPage[] = [
  {
    pathname: '/material-ui/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/material-ui/components/inputs',
        subheader: 'inputs',
        children: [
          { pathname: '/material-ui/react-autocomplete' },
        ],
      },
    ],
  },
];

export default pages;
