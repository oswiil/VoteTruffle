import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Route, useHistory } from 'react-router-dom';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import HomeIcon from '@material-ui/icons/Home';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PersonIcon from '@material-ui/icons/Person';
import { init } from '../API_smartContract/contractConstRequirement';
import { useDispatch, useSelector } from 'react-redux';

import { addAccounts } from '../redux/actions';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    marginThreshold={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
export default function () {
  const [loading, setLoading] = useState(false);
  const [isConected, setIsConected] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const Web3 = useSelector((state) => state.candidatos);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const initWeb3 = async () => {
    try {
      setLoading(true);
      const { web3, contract, accounts } = await init();
      dispatch(addAccounts(accounts));
      setLoading(false);
      if (accounts.length > 0) {
        setIsConected(true);
        Promise.resolve(!isConected).then(() => initWeb3);
      }
    } catch (e) {
      setLoading(false);
    }
  };
  // if (!isConected) {
  //   initWeb3();
  // }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          OPCIONES
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={() => history.push('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => history.push('/crearVotacion')}>
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText primary="Crear votación" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => history.push('/entrarVotacion')}>
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText primary="Entrar en votación"></ListItemText>
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil">
              {' '}
              <Route path="/about" />
            </ListItemText>
          </StyledMenuItem>
        </StyledMenu>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={initWeb3}
        >
          CONECTAR
        </Button>
      </div>
    </div>
  );
}
