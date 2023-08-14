import { Button, Paper, Stack, Tooltip, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import ReducedPerkBanner from "../ReducedPerkBanner";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../utils/ItemTypes";
import ClearIcon from '@mui/icons-material/Clear';
import { isMobile } from "react-device-detect";
import AddIcon from '@mui/icons-material/Add';

export default function PerkContainerSingle(props) {

    const { index, perks, onDrop, canDrop, onDelete, handleAddPerkWithCharm, selector, onClick, selectorPerk, charm } = props;

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    const [hover, setHover] = useState(false);

    const ref = React.useRef(null);

    const [{ canDropField, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.PERK,
        drop: (item, monitor) => onDrop(index, item),
        canDrop: (item, monitor) => canDrop(item.perk),
        collect: (monitor) => ({
            canDropField: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    }))

    React.useEffect(() => {
        setFirstRender(false);
    }, [])

    const shouldRenderDisable = () => {
        if (firstRender) {
            return false;
        }
        if(selector) {
            return !canDrop(selectorPerk);
        } else {
            return !canDropField && isOver;
        }
    }

    useLayoutEffect(() => {
        if (!canDropField && isOver) {
            return;
        }
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
    });


    const getCause = () => {
        if(perks.some(perk => perk.charm)) {
            return "Impossible d'ajouter des avantages à un emplacement d'avantage avec un charme"
        } else {
            return "Cet avantage est exclusif aux autres emplacements d'avantages";
        }
    }

    const getPerkAdditionText = () => {
        if (isMobile) {
            return <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Press </span><AddIcon /> <span> on Perks below to add them</span> 
            </div>
        }
        return "Faites glisser les avantages pour les ajouter à ce groupe"
    }

    const handleClick = () => {
        if (!shouldRenderDisable() && selector) {
            onClick();
        }
    }

    let content;
    if (shouldRenderDisable()) {
        content = (
            <div style={{
                position: "absolute",
                height: height,
                width: width,
                border: 'solid',
                borderColor: '#FFAAAA',
                backgroundColor: '#552222',
                display: "flex",
                alignItems: "center",
            }} >
                <div style={{
                    marginLeft: 'auto', marginRight: 'auto', width: '100%',
                }}>
                    <ClearIcon sx={{ color: '#FFAAAA', marginLeft: 'auto', marginRight: 'auto', width: '100%', }} />
                    <Typography textAlign="center" sx={{ color: '#FFAAAA' }} >
                        {getCause()}
                    </Typography>
                </div>
            </div>
        )
    } else {
        content = (
            <div style={{ paddingTop: '1em', minHeight: '8em' }}>
                <Typography style={{ margin: '0em 0em 0.5em 0.5em', paddingBottom: '0.5em' }} variant="h6" >
                    {`Emplacement d'atout ${index + 1}`}
                </Typography>
                {perks.map((perk, ind) => {
                    return <ReducedPerkBanner selector={selector} onDelete={(perk) => onDelete(index, perk)} key={perk.perk.perkId} containerId={index} perk={perk} />
                })}
                {
                    !selector && !perks.some(perk => perk.charm) && (
                        <Stack style={{ height: '5em', display: 'flex', alignItems: 'center', opacity: 0.5 }} direction='row' justifyContent={"center"} >
                            <Typography textAlign={"center"} >
                                {getPerkAdditionText()}
                            </Typography>
                        </Stack>

                    )
                }
                {
                    (!selector && charm) && (
                        <Stack style={{ height: '5em', display: 'flex', alignItems: 'center', opacity: 0.5 }} direction='row' justifyContent={"center"} >
                            <Tooltip title="Les charmes ne peuvent être ajoutés que sur des emplacements d'avantages vides" open={tooltipOpen && (perks.length !== 0)} >
                                <div onMouseEnter={() => setTooltipOpen(true) } onMouseLeave={() => setTooltipOpen(false) } >
                                    <Button disabled={perks.length !== 0} onClick={() => handleAddPerkWithCharm(index)} color="secondary" variant="outlined" >
                                        Ajoutez un avantage avec du charme
                                    </Button>
                                </div>
                            </Tooltip>
                        </Stack>
                    )
                }


            </div>
        )
    }

    return (
        <>
            <Paper onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} ref={ref} onClick={handleClick} elevation={ selector && hover ? 6 : 1} >
                <div style={ shouldRenderDisable() ? { width: width, height: height } : {}} ref={selector ? undefined : drop} >
                    {content}
                </div>
            </Paper>

        </>

    )

}