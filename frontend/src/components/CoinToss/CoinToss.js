import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Paper,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { tossCoin } from "../../actions/tossCoin";
import { getHistory } from "../../actions/getHistory";
import * as yup from "yup";

function CoinToss() {
    const [wager, setWager] = useState("");
    const [choice, setChoice] = useState("");
    const [errors, setErrors] = useState({});
    const balance = useSelector((state) => state.balance);
    const [processing, setProcessStatus] = useState(false);
    const isFormDisabled = balance <= 0;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHistory());
    }, [dispatch]);

    const validationSchema = yup.object({
        wager: yup
            .number()
            .transform((value) => (isNaN(value) ? undefined : value))
            .required("Wager is required")
            .positive("Wager must be a positive number")
            .max(
                balance,
                `Cannot wager more than your current balance: ${balance} tokens`
            )
            .integer("Wager must be an integer"),
        choice: yup.string().required("Choice is required"),
    });

    const validateForm = async () => {
        try {
            await validationSchema.validate(
                { wager, choice },
                { abortEarly: false }
            );
            setErrors({});
            return true;
        } catch (yupError) {
            const newErrors = {};
            if (yupError.inner) {
                yupError.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
            }
            setErrors(newErrors);
            return false;
        }
    };

    const toastNotification = (result, bonus) => {
        toast[result ? "success" : "error"](
            `You ${result ? "Win" : "Lose"}${bonus ? ` Bonus X${bonus}` : ""}`,
            {
                position: "top-center",
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: true,
                closeButton: false,
                draggable: false,
                progress: undefined,
            }
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
            setProcessStatus(true);
            dispatch(tossCoin({ wager, choice })).then((e) => {
                const result = choice === e.result;
                setTimeout(() => {
                    setProcessStatus(false);
                    dispatch(getHistory());
                    toastNotification(result, e.bonus);
                }, 500);
            });
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
            <Paper
                elevation={3}
                sx={{ padding: 2, width: "100%", maxWidth: 400 }}
            >
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="Wager Amount"
                        variant="outlined"
                        type="number"
                        value={wager}
                        onChange={(e) => setWager(e.target.value)}
                        disabled={isFormDisabled}
                        fullWidth
                        error={!!errors.wager}
                        helperText={
                            errors.wager ||
                            (isFormDisabled
                                ? "You have no tokens to wager."
                                : "")
                        }
                    />
                    <RadioGroup
                        row
                        value={choice}
                        onChange={(e) => setChoice(e.target.value)}
                        sx={{ justifyContent: "center", mt: 2 }}
                    >
                        <FormControlLabel
                            value="heads"
                            control={<Radio />}
                            label="Heads"
                            disabled={isFormDisabled}
                        />
                        <FormControlLabel
                            value="tails"
                            control={<Radio />}
                            label="Tails"
                            disabled={isFormDisabled}
                        />
                    </RadioGroup>
                    {errors.choice && (
                        <Typography
                            style={{ color: "red", textAlign: "center" }}
                        >
                            {errors.choice}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isFormDisabled || processing}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {processing ? (
                            <CircularProgress size={25} />
                        ) : (
                            "Toss Coin"
                        )}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default CoinToss;
