import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import itemClasses from '../../res/itemClasses.json'
import itemClassesFR from '../../res/itemClassesFR.json'
import ItemCard from "./components/ItemCard";
import logo from '../../res/logo.png';

//Translation module
import { useTranslation} from 'react-i18next';

function Home() {
	const { t, i18n } = useTranslation();
    const renderContent = () => {

		if (i18n.language == 'en') {
			return (
				<>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
						<img src={logo} alt='Logo' style={{ height: '10em' }} />
					</div>
					<Grid style={{ padding: '2em' }} container spacing={4} >
						{Object.keys(itemClasses).map((itemClass, index) => {
							return (
								<Grid key={index} item md={3} xs={6} >
									<Link to={`/${itemClass}`} style={{ textDecoration: 'none' }} >
										<ItemCard name={itemClass} icon={`../../res/${itemClasses[itemClass].icon}`} />
									</Link>
								</Grid>
							)
						})}
					</Grid>
				</>
			)
		}else{
			return (
				<>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
						<img src={logo} alt='Logo' style={{ height: '10em' }} />
					</div>
					<Grid style={{ padding: '2em' }} container spacing={4} >
						{Object.keys(itemClassesFR).map((itemClass, index) => {
							return (
								<Grid key={index} item md={3} xs={6} >
									<Link to={`/${itemClass}`} style={{ textDecoration: 'none' }} >
										<ItemCard name={itemClass} icon={`../../res/${itemClassesFR[itemClass].icon}`} />
									</Link>
								</Grid>
							)
						})}
					</Grid>
				</>
			)
		}
    }
	
    return renderContent();
}

export default Home;