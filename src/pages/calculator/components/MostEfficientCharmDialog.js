import { Dialog, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

export default function MostEfficientCharmDialog(props) {

    let { open, handleClose, result } = props;

    const generateRows = () => {
        return result.sort((a, b) => {
            if (a.probability.total < b.probability.total) {
                return 1;
            } else if (a.probability.total > b.probability.total) {
                return -1;
            }
            return 0;
        }).map((element, key) => {
            return (
                <TableRow hover key={key} >
                    {element.perks.map((perk, index) => {
                        return (
                            <React.Fragment key={index} >
                                <TableCell>{perk.perk.name}</TableCell>
                                <TableCell>{perk.perk.charm.name}</TableCell>
                            </React.Fragment>
                        )
                    })}
                    <TableCell>{`${element.probability.total * 100}%`}</TableCell>
                    <TableCell>{`${Math.round(1 / element.probability.total)} tries`}</TableCell>
                </TableRow>
            )
        })
    }

    const generatePerkHeader = () => {
        const perkLength = result[0]?.perks.length;
        const indexes = [...Array(perkLength).keys()]
        let names = [];
        if (indexes.length === 1) {
            names.push("Atout")
        } else {
            names = indexes.map(index => `Perk ${index + 1}`)
        }
        return (
            <TableHead>
                <TableRow>
                    {names.map((name, index) => (
                        <TableCell key={index} align="center" colSpan={2}>{name}</TableCell>
                    ))}
                    <TableCell>Probabilité</TableCell>
                    <TableCell>Essai moyen</TableCell>
                </TableRow>
                <TableRow>
                    {names.map((name, index) => (
                        <React.Fragment key={index} >
                            <TableCell style={{top: 57}} >Nom</TableCell>
                            <TableCell style={{top: 57}} >Charme</TableCell>
                        </React.Fragment>
                    ))}
                    <TableCell colSpan={2} style={{top: 57}}></TableCell>
                </TableRow>
            </TableHead>
        )

    }

    return (
        <Dialog

            maxWidth={'lg'}
            onClose={handleClose}
            open={open}
            fullWidth
        >
            <DialogTitle>Résultat du calcul</DialogTitle>
            <TableContainer sx={{ fontSize: '2' }} component={Paper}>
                <Table sx={{ fontSize: '200pt' }} stickyHeader >
                    {generatePerkHeader()}
                    <TableBody>
                        {generateRows()}
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    )

}
