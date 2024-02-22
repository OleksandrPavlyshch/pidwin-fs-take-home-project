import React, { useState, useEffect } from "react";
import {
    AppBar,
    Typography,
    Toolbar,
    Avatar,
    Button,
    Stack,
    Tooltip,
    IconButton,
    MenuItem,
    Menu,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Logout, ChangeCircle } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import PlayerBalance from "../PlayerBalance/PlayerBalance";
import { styles } from "./styles";

const Navbar = () => {
    const [user, setUser] = useState(
        localStorage.getItem("profile")
            ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
            : "null"
    );
    const dispatch = useDispatch();
    let location = useLocation();
    const history = useNavigate();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history("/auth");
        setUser("null");
    };

    useEffect(() => {
        if (user !== "null" && user !== null) {
            if (user.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(
            localStorage.getItem("profile")
                ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
                : "null"
        );
    }, [location]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar style={styles.appBar} position="static" color="inherit">
            <div style={styles.brandContainer}>
                <Typography
                    component={Link}
                    to="/"
                    sx={styles.heading}
                    variant="h3"
                    align="center"
                >
                    CoinToss
                </Typography>
            </div>
            <Toolbar style={styles.toolbar}>
                {user !== "null" && user !== null ? (
                    <div style={styles.profile}>
                        <Stack alignItems="center" spacing={2} direction="row">
                            <Stack>
                                <Typography
                                    style={styles.userName}
                                    variant="h6"
                                >
                                    {user.name}
                                </Typography>
                                <PlayerBalance />
                            </Stack>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={
                                        open ? "account-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                >
                                    <Avatar
                                        style={styles.purple}
                                        alt={user.name}
                                        src={user.picture}
                                    >
                                        {user.name.charAt(0)}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        "&::before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform:
                                                "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{
                                    horizontal: "right",
                                    vertical: "top",
                                }}
                                anchorOrigin={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        history("/password");
                                        handleClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <ChangeCircle fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Change Password</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Stack>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
