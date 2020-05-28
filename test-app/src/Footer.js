import React, {useState} from 'react';
import {Button} from 'antd'; 
import { InlineDiv } from './common/components';
import './customCSS.css'

//routing with 'react-router-dom'
const Footer = (props) => {
	const [footerMenuState, setFooterMenuState] = useState("footerMenu preload_footer")
	const toggleMenuState = () => {
		setFooterMenuState(
			(footerMenuState ==="footerMenu preload_footer" || footerMenuState === "footerMenu inactive_footer" ) ? 
				"footerMenu active_footer" : 
				"footerMenu inactive_footer"
		)
	}
	
	return(
		<div className={footerMenuState}>
		<InlineDiv 
			text={
				<Button type= 'link' onClick={()=>{
					toggleMenuState();
				}}>
						test
				</Button>}/>
		</div>
	
	)	
}
export default Footer;



//<NavLink exact={true} activeClassName="activeLink" to="/test" >TESTING</NavLink>
