import React, { useState, useContext, useEffect } from 'react';
import SidebarToggleHandler from '../../../../../@coremat/CmtLayouts/Vertical/SidebarToggleHandler';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, InputBase, Button, Typography } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import CmtImage from '../../../../../@coremat/CmtImage';
import DappContext from '../../../../../modules/Context/DappContext';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

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

// TODO: Put the context switcher in its own component
const Header = () => {
  const classes = useStyles();

  // Choose Project
  const [actionsList, setActionsList] = useState([]);
  const { projects, selectedProject, setSelectedProject } = useContext(DappContext);
  useEffect(() => {
    let aL = [];
    projects?.forEach((x, index) => {
      console.log(x);
      try {
        aL.push({
          icon: <CmtImage src={x.imageURL} height="30px" width="30px" className="mr-2" />,
          label: x.name,
          image: x.imageURL,
          index: index
        });
      }
      catch {}
    });

    if(aL.length > 0) {
      setActionsList(aL);
      setActiveOption(aL[selectedProject]);
    }
  }, [projects]);
  const [activeOption, setActiveOption] = useState();

  const onItemClick = (option) => {
    setActiveOption({ label: option.label, image: option.image });
    setSelectedProject(option.index);
  };

  // Connect to Wallet
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account);

  return (
    <Toolbar className={classes.root}>
      <SidebarToggleHandler edge="start" color="inherit" aria-label="menu" />
      {actionsList.length > 0 ?
      <Box display="flex" flexDirection='row' mt='unset'>
        <CmtImage
          src={activeOption?.image}
          height="30px"
          width="30px"
          className="mr-2"
        />
        <Typography size="md" className="mr-1">{activeOption?.label}</Typography>
        <CmtDropdownMenu
          onItemClick={onItemClick}
          TriggerComponent={<KeyboardArrowDownIcon />}
          items={actionsList}
        />
      </Box> : <></>
      }
      <Box flex={1} />
      <Box>
        {account == null ?
          <Button onClick={activateBrowserWallet}>
            Connect
          </Button> : <></>
        }
        <Typography>{account && `Account: ${account}`}</Typography>
        <Typography>{etherBalance && `Balance: ${formatEther(etherBalance)}`}</Typography>
      </Box>

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
