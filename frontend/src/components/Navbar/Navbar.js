import React, { useState, useEffect } from "react";
import {
    AppBar,
    Typography,
    Toolbar,
    Avatar,
    Button,
    Stack,
} from "@mui/material";
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

    return (
        <AppBar style={styles.appBar} position="static" color="inherit">
            <div style={styles.brandContainer}>
                <Typography
                    component={Link}
                    to="/"
                    sx={styles.heading}
                    variant="h5"
                    align="center"
                >
                    CoinToss
                </Typography>
            </div>
            <Toolbar style={styles.toolbar}>
                {user !== "null" && user !== null ? (
                    <div style={styles.profile}>
                        <Stack spacing={2} direction="row">
                            <Avatar
                                style={styles.purple}
                                alt={user.name}
                                src={user.picture}
                            >
                                {user.name.charAt(0)}
                            </Avatar>
                            <Typography style={styles.userName} variant="h6">
                                {user.name}
                            </Typography>
                        </Stack>
                        <PlayerBalance />
                        <Stack sx={{ pt: 1 }} spacing={2} direction="row">
                            <Button
                                variant="contained"
                                style={styles.logout}
                                color="secondary"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    history("/password");
                                }}
                            >
                                Set Password
                            </Button>
                        </Stack>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
