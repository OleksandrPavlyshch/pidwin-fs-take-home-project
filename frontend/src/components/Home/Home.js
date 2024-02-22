import React from "react";
import { Container, Grow, Paper, Typography, Stack } from "@mui/material";
import CoinToss from "../CoinToss/CoinToss";
import HistoryTable from "../History/history";
import { jwtDecode } from "jwt-decode";

const Home = () => {
    const user = localStorage.getItem("profile")
        ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
        : "null";
    const isSingedIn = user;

    return (
        <Grow in>
            <Container component="main" maxWidth="md">
                {isSingedIn !== "null" && isSingedIn !== null ? (
                    <Stack spacing={2} direction="column">
                        <CoinToss />
                        <HistoryTable/>
                    </Stack>
                ) : (
                    <Paper elevation={3}>
                        <Typography variant="h4" align="center" color="primary">
                            Login to Play
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Grow>
    );
};

export default Home;
