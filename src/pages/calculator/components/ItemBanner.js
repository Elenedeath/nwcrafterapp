import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import React from "react";
import itemClasses from '../../../res/itemClasses.json'
import itemClassesFR from '../../../res/itemClassesFR.json'
import bgLegendary from '../../../res/bg/legendary.png'
import bgEpic from '../../../res/bg/epic.png'

//Translation module
import { useTranslation} from 'react-i18next';

function ItemBanner(props) {

    const theme = useTheme();

    const config = {
        banner: bgLegendary,
        color: theme.palette.rarity.legendary,
        name: "Legendary"
    }

	const { t, i18n } = useTranslation();
    const renderContent = () => {
        const {itemClass} = props;
		
		if (i18n.language == 'en') {
			var icon = itemClasses[itemClass].icon
		}else{
			var icon = itemClassesFR[itemClass].icon
		}
			const imgSrc = `${process.env.PUBLIC_URL}/res/${icon}`;
        return (
            <div style={{
                backgroundImage: `url(${config.banner})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                boxShadow: 5,
                border: 'solid',
                borderColor: '#000000AA',
            }}>
                <Grid
                    spacing={2}
                    style={{
                        padding: '1em'
                    }}
                    container
                    wrap="nowrap"
                >
                    <Grid item >
                        <div style={{
                            display: "inline-block",
                            border: 'solid',
                            borderWidth: '0.15em',
                            borderColor: config.color,
                            backgroundImage: "linear-gradient(to bottom, " + config.color + "90, " + config.color + "60)",
                        }}>
                            <img src={imgSrc} alt="" style={{ width: '5em' }} />
                        </div>
                    </Grid>
                    <Grid container item xs={9} style={{ paddingTop: '0.5em' }} >
                        <Grid item xs={12} >
                            <Typography variant="h5" style={{ filter: "drop-shadow(0.1em 0.2em 0.1em black)" }} color={config.color} >
                                {itemClass}
                            </Typography>
                        </Grid>
                        <Grid item container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                        >
                            <Grid item>
                                <Typography variant="h6" style={{ filter: "drop-shadow(0.1em 0.2em 0.1em black)" }} color={config.color} >
                                    {config.name}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>

            </div>
        )

    }

    return renderContent();

}

export default ItemBanner;