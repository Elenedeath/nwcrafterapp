import { Collapse, Dialog, DialogTitle, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

export default function CalculatorResultDialog(props) {

    let { open, handleClose, result } = props;

    const [openTotal, setOpenTotal] = React.useState(false);
    const [openLegendary, setOpenLegendary] = React.useState(false);
    const [openEpic, setOpenEpic] = React.useState(false);

    React.useEffect(() => {
        if (!openTotal) {
            setOpenEpic(false);
            setOpenLegendary(false);
        }
    }, [openTotal])

    const tries = Math.round(1 / result.total);

    const [calcTries, setCalcTries] = React.useState(tries);

    const calculateProbabilty = () => {
        if (!calcTries || isNaN(calcTries)) {
            return "0%"
        }
        return `${(1 - Math.pow(1 - result.total, calcTries)) * 100}%`;
    }

    const toPercent = (num) => {
        return `${num * 100}%`;
    }

    const handleChange = (e) => {
        let val = e.target.valueAsNumber;
        if (isNaN(val)) {
            setCalcTries(0);
            return;
        }
        setCalcTries(val);
    }

    React.useEffect(() => {
        setCalcTries(tries);
    }, [tries]);

    const style = { fontSize: '0.06em' };

    const onClose = () => {
        setOpenTotal(false);
        handleClose();
    }

    const tableEpic = () => {
        return (
            <>
                <TableRow sx={{ '& > *': { border: 'unset' } }} >
                    <TableCell style={{width: 0}} >
                        <IconButton
                            onClick={() => setOpenEpic(!openEpic)}
                        >
                            {openEpic ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell sx={style} >Chance épique totale :</TableCell>
                    <TableCell align="right" sx={style}>{toPercent(result.epicTotal)}</TableCell>
                </TableRow>
                <TableRow sx={{ '& > *': { border: 'unset' } }}>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3} >
                        <Collapse in={openEpic} >
                            <Box sx={{ margin: '0.5em' }} >
                                <Table size="small" sx={{ fontSize: '200pt' }}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={style}> Chance de toucher du épique :</TableCell>
                                            <TableCell sx={style} align="right">{toPercent(result.chanceToHitEpic)}</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell sx={style}> Chance d'obtenir des avantages sélectionnés sur un objet épique :</TableCell>
                                            <TableCell sx={style} align="right"> {toPercent(result.epicChance)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    }

    const tableLegendary = () => {
        return (
            <>
                <TableRow sx={{ '& > *': { border: 'unset' } }} >
                    <TableCell style={{width: 0}} >
                        <IconButton
                            onClick={() => setOpenLegendary(!openLegendary)}
                        >
                            {openLegendary ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell sx={style} >Chance légendaire totale :</TableCell>
                    <TableCell align="right" sx={style}>{toPercent(result.legendaryTotal)}</TableCell>
                </TableRow>
                <TableRow sx={{ '& > *': { border: 'unset' } }}>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3} >
                        <Collapse in={openLegendary} >
                            <Box sx={{ margin: '0.5em' }} >
                                <Table size="small" sx={{ fontSize: '200pt' }}>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell sx={style}> Chance de toucher du légendaire :</TableCell>
                                            <TableCell sx={style} align="right">{toPercent(result.chanceToHitLegendary)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={style}> Chance d'obtenir des avantages sélectionnés sur un objet légendaire :</TableCell>
                                            <TableCell sx={style} align="right"> {toPercent(result.legendaryChance)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    }

    const tableTotal = () => {
        return (
            <>
                <TableRow sx={{ '& > *': { border: 'unset' } }} >
                    <TableCell style={{width: 0}} >
                        <IconButton
                            onClick={() => setOpenTotal(!openTotal)}
                        >
                            {openTotal ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell sx={style} >Chance totale :</TableCell>
                    <TableCell sx={style} align="right">{toPercent(result.total)}</TableCell>
                </TableRow>
                <TableRow >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                        <Collapse in={openTotal} >
                            <Table size="small" sx={{ fontSize: '200pt' }} >
                                <TableBody>
                                    {tableLegendary()}
                                    {tableEpic()}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    }

    const generateTable = () => {
        return (
            <Table sx={{ fontSize: '220pt' }} >
                <TableBody>
                    {tableTotal()}
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={style} >Tentatives moyenne de craft :</TableCell>
                        <TableCell sx={style} align="right">{tries}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={style} >
                            <>
                                {"Probabilité de toucher après : "}
                                <TextField
                                    value={calcTries.toString()}
                                    onChange={handleChange}
                                    color="secondary"
                                    style={{ width: '6em', marginLeft: '0.5em' }}
                                    type="number"
                                    size="small"
                                    variant="standard"
                                    InputProps={{
                                        inputProps: { min: 0 },
                                        endAdornment: <InputAdornment position="end">tries</InputAdornment>,
                                    }} />
                            </>
                        </TableCell>
                        <TableCell align="right" sx={style}>{calculateProbabilty()}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        )
    }

    return (
        <Dialog

            maxWidth={'md'}
            onClose={onClose}
            open={open}
            fullWidth
        >
            <Grid style={{paddingRight: '1em'}} container alignItems={"center"} justifyContent={"space-between"} >
                <Grid item>
                    <DialogTitle>
                    Résultat du calcul
                    </DialogTitle>
                </Grid>
                <Grid >
                    <IconButton onClick={onClose} >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
            <Box sx={{ padding: '1em' }} >
                <TableContainer component={Paper} >
                    {generateTable()}
                </TableContainer>
            </Box>
        </Dialog>
    )

}
