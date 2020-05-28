import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { InlineDiv } from './common/components.js'
import './customCSS.css'
import { 
//	Input
} from 'antd'
import {MenuOutlined, UserOutlined} from '@ant-design/icons'
import {useSelector, useDispatch} from 'react-redux'
import {toggleNavMenuState} from './actions'


const Header = (props) => {
	const dispatch = useDispatch()
	const menuVisibility = useSelector(state=>state.navMenuVisibility)

	const [userMenuState, setUserMenuState] = useState('userMenu preload_menu')

	const toggleMenuState = () => (menuVisibility === "menu preload_menu" || menuVisibility === "menu inactive_menu")?dispatch(toggleNavMenuState("menu active_menu")):dispatch(toggleNavMenuState("menu inactive_menu"))
	

	const toggleUserMenuState = () => {
		setUserMenuState(
			(userMenuState === 'userMenu preload_menu' || userMenuState === 'userMenu inactive_menu') ? 
			'userMenu active_menu' : 'userMenu inactive_menu'
		)
	}


	return (
		<div>
			<div
				style={{
					zIndex: '997',
					height: '50px',
					width: '100%',
					padding: '90px',
					paddingTop: '0px',
					paddingBottom: '0px',
					left: '50%',
					transform: 'translateX(-50%)',
					position: 'fixed',      
					borderBottom: ' 1px solid black',
					boxShadow: '0px 0px 10px rgba(0,0,0, 1.0)',
					backgroundColor:'#ffffff',
					display: 'flex',
				}}
			>
				<div 
					style={{
						width: '100%',
						color: '#000000',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					<div style={{left: '0px'}}>Logo</div>
					<div style={{position: 'absolute',
					left: '50%',
					transform: 'translateX(-50%)',
					}}>TITLE</div> 		
					{/* <div><Icon type='search' style={{paddingLeft: '8px', paddingRight: '8px'}}/>
					<Input style={{width: 'auto', border: 'none', borderBottom: '1px solid grey', borderRadius: '0px'}}/>
					</div> */}
				</div>
			</div>

			<div
				className='tab'>
				<MenuOutlined
					onClick={()=>{
						toggleMenuState()
					}}
					style={{margin: 'auto'}} type="menu"
				/>
			</div>


			<div className='tab' style={{left:'auto', right: '14px'}}>
				<UserOutlined type="user" onClick={()=>{
					toggleUserMenuState()
				}}/>
			</div>

			<div className={menuVisibility}>
				<InlineDiv text={
					<NavLink onClick={()=>toggleMenuState()} exact={true} className='menuItem' activeClassName="activeLink" to="/">Home</NavLink>
				}/>
				<InlineDiv text={
					<NavLink onClick={()=>toggleMenuState()} className='menuItem' exact={true} activeClassName="activeLink" to="/mama">Mama</NavLink>
				}/>
				<InlineDiv text={
					<NavLink onClick={()=>toggleMenuState()} className='menuItem' exact={true} activeClassName="activeLink" to="/papa">Papa</NavLink>
				}/>
				<InlineDiv text={
					<NavLink onClick={()=>toggleMenuState()} className='menuItem' exact={true} activeClassName="activeLink" to="/bear">Bear</NavLink>
				}/>
				<InlineDiv text={
					<NavLink onClick={()=>toggleMenuState()} className='menuItem' exact={true} activeClassName="activeLink" to="/panel">Panel</NavLink>
				}/>
			</div> 


			<div className={userMenuState}>
				<InlineDiv text={
					<NavLink exact={true} className='menuItem' activeClassName="activeLink" to="/">Login</NavLink>
				}/>
				<InlineDiv text={
					<NavLink className='menuItem' exact={true} activeClassName="activeLink" to="/mama">Register</NavLink>
				}/>
			</div> 


		</div>
	)
}

export default Header
