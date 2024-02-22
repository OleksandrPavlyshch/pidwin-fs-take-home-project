import React from "react";
import {
    TableContainer,
    TableHead,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

function HistoryTable() {
    const rows = useSelector((state) => state.history);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Wager</TableCell>
                        <TableCell>Choice</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Win Amount</TableCell>
                        <TableCell>Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows &&
                        rows.map((row) => (
                            <TableRow
                                key={row.createdAt}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>{row.wager}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize' }}>{row.choice}</TableCell>
                                <TableCell>
                                    {row.success ? "Win" : "Lose"}
                                </TableCell>
                                <TableCell>{row.winAmount}</TableCell>
                                <TableCell>{row.balance}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default HistoryTable;
