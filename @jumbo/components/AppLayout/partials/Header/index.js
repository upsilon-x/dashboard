import React, { useState } from 'react';
import SidebarToggleHandler from '../../../../../@coremat/CmtLayouts/Vertical/SidebarToggleHandler';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, InputBase, IconButton, Typography } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import CmtImage from '../../../../../@coremat/CmtImage';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
//import LanguageSwitcher from '../LanguageSwitcher';
import makeStyles from '@material-ui/core/styles/makeStyles';
/*
import SearchIcon from '@material-ui/icons/Search';
import AppsMenu from './AppsMenu';
import HeaderNotifications from './HeaderNotifications';
import HeaderMessages from './HeaderMessages';
import Hidden from '@material-ui/core/Hidden';
import Logo from '../Logo';
import SearchPopover from '../SearchPopover';
*/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 64,
    [theme.breakpoints.up('md')]: {
      minHeight: 72,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
  searchRoot: {
    position: 'relative',
    width: 260,
    [theme.breakpoints.up('md')]: {
      width: 350,
    },
    '& .MuiSvgIcon-root': {
      position: 'absolute',
      left: 18,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      height: 48,
      borderRadius: 30,
      backgroundColor: alpha(theme.palette.common.dark, 0.38),
      color: alpha(theme.palette.common.white, 0.7),
      boxSizing: 'border-box',
      padding: '5px 15px 5px 50px',
      transition: 'all 0.3s ease',
      '&:focus': {
        backgroundColor: alpha(theme.palette.common.dark, 0.58),
        color: alpha(theme.palette.common.white, 0.7),
      },
    },
  },
  langRoot: {
    borderLeft: `solid 1px ${alpha(theme.palette.common.dark, 0.15)}`,
    minHeight: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      minHeight: 64,
    },
  },
  iconBtn: {
    color: alpha(theme.palette.common.white, 0.38),
    '&:hover, &:focus': {
      color: theme.palette.common.white,
    },
  },
}));

// TODO: Add to context + do a query request if context is null
// TODO: Put the context switcher in its own component
const actionsList = [
  {
    icon: <CmtImage src="https://play-lh.googleusercontent.com/10axL9ZMum2LZmCsVutZwvwfx0bkYhB-G7c12Qvl1xDexMYxcqwILCYNgnzzcSDbLrAw=s180-rw"
      height="30px" width="30px" className="mr-2" />,
    label: 'Project 1',
    image: "https://play-lh.googleusercontent.com/10axL9ZMum2LZmCsVutZwvwfx0bkYhB-G7c12Qvl1xDexMYxcqwILCYNgnzzcSDbLrAw=s180-rw"
  },
  {
    icon: <CmtImage src="https://play-lh.googleusercontent.com/-meRETSTUS8DBtnim75eGwlTPncfiUpR5zAiSl3hu5NnuETVmYA4Fk-vIUBVWdd-ynw=s180-rw"
      height="30px" width="30px" className="mr-2" />,
    label: 'Project 2',
    image: "https://play-lh.googleusercontent.com/-meRETSTUS8DBtnim75eGwlTPncfiUpR5zAiSl3hu5NnuETVmYA4Fk-vIUBVWdd-ynw=s180-rw"
  },
];

const Header = () => {
  const classes = useStyles();

  const [activeOption, setActiveOption] = useState(actionsList[0]);

  const onItemClick = (option) => {
    setActiveOption({ label: option.label, image: option.image });
  };

  return (
    <Toolbar className={classes.root}>
      <SidebarToggleHandler edge="start" color="inherit" aria-label="menu" />
      <Box display="flex" flexDirection='row' mt='unset'>
        <CmtImage
          src={activeOption.image}
          height="30px"
          width="30px"
          className="mr-2"
        />
        <Typography size="md" className="mr-1">{activeOption.label}</Typography>
        <CmtDropdownMenu
          onItemClick={onItemClick}
          TriggerComponent={<KeyboardArrowDownIcon />}
          items={actionsList}
        />
      </Box>
      <Box flex={1} />

      {/*
      <Logo ml={2} color="white" />
      <Box flex={1} />
      <Hidden smDown>
        <Box pr={3} className={classes.searchRoot}>
          <InputBase placeholder={'Search here...'} inputProps={{ 'aria-label': 'search' }} />
          <SearchIcon />
        </Box>
      </Hidden>
      <Hidden mdUp>
        <SearchPopover iconClassName={classes.iconBtn} />
      </Hidden>
      <AppsMenu />
      <HeaderMessages />
      <HeaderNotifications />
      <Box className={classes.langRoot}>
        <LanguageSwitcher />
      </Box>
      */}
    </Toolbar>
  );
};

export default Header;
