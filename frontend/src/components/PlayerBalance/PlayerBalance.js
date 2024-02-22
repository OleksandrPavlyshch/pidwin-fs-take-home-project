import React, { useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../actions/getBalance";

const PlayerBalance = () => {
    const dispatch = useDispatch();
    const tokens = useSelector((state) => state.balance);

    useEffect(() => {
        dispatch(getBalance());
    }, [dispatch]);

    return (
        <Stack spacing={1} direction="row" alignItems="center" >
            <Typography variant="body2">Tokens:</Typography>
            <Typography variant="body1">{tokens}</Typography>
        </Stack>
    );
};

export default PlayerBalance;
