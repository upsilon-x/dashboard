import React from 'react';
import { PostAdd, Storefront, EmojiEvents, NewReleases } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = [
  {
    name: <IntlMessages id={'pages.projectsPage'} />,
    type: 'item',
    icon: <PostAdd />,
    link: '/projects',
  },
  {
    name: <IntlMessages id={'sidebar.manage'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'pages.releasesPage'} />,
        type: 'item',
        icon: <NewReleases />,
        link: '/releases',
      },
      {
        name: <IntlMessages id={'pages.storePage'} />,
        type: 'item',
        icon: <Storefront />,
        link: '/store-page',
      },
      {
        name: <IntlMessages id={'pages.achievementsPage'} />,
        type: 'item',
        icon: <EmojiEvents />,
        link: '/achievements',
      }
    ],
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.manage'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.projectsPage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/projects',
      },
      {
        name: <IntlMessages id={'pages.releasesPage'} />,
        type: 'item',
        icon: <NewReleases />,
        link: '/releases',
      },
      {
        name: <IntlMessages id={'pages.storePage'} />,
        type: 'item',
        icon: <Storefront />,
        link: '/store-page',
      },
      {
        name: <IntlMessages id={'pages.achievementsPage'} />,
        type: 'item',
        icon: <EmojiEvents />,
        link: '/achievements',
      }
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.manage'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.projectsPage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/projects',
      },
      {
        name: <IntlMessages id={'pages.releasesPage'} />,
        type: 'item',
        icon: <NewReleases />,
        link: '/releases',
      },
      {
        name: <IntlMessages id={'pages.storePage'} />,
        type: 'item',
        icon: <Storefront />,
        link: '/store-page',
      },
      {
        name: <IntlMessages id={'pages.achievementsPage'} />,
        type: 'item',
        icon: <EmojiEvents />,
        link: '/achievements',
      }
    ],
  },
];
