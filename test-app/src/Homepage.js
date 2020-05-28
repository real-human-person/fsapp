import React, {useState, useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Panel } from './Panel'
import {Form, Input, Table} from 'antd'
//import {TOGGLE_NAV_MENU_STATE} from './actionTypes'
//import {toggleNavMenuState} from './actions'
import { toggleNavMenuState } from './actions'
import { useDispatch, useSelector } from 'react-redux'

const axios = require('axios')

const Homepage = () => {


	const dispatch = useDispatch()

	const menuVisibility = useSelector(state=>state.navMenuVisibility)

	const [user, setUser] = useState("---")
	const [userTable, setUserTable] = useState([])

	let a = []
	for (let i = 0 ; i <=45; i++){
		a[i] = "TOAST".repeat(i)
	}

	useEffect(()=>{
		axios.get(process.env.REACT_APP_BACKEND+'/users').then((res)=>{
			setUserTable(res.data)
		}).catch((err)=>{
			console.log(err)
		})
	},[])

	const Mama = () => {
		return(<div>MAMA</div>)
	}

	const Papa = () => {


		const columns=[
		{
			title: 'name',
			dataIndex: 'name',
			render: text => <b>{text}</b>
		},
		{
			title: 'age',
			dataIndex: 'age',
			render: text => <b>{text}</b>
		},
		{
			title: 'rank',
			dataIndex: 'rank',
			render: text => <b>{text}</b>
		}
	]


		var s = "---------------"

		const setString = (e) => {
			s = e.target.value
		}

		const logChange = (e) => {
			e.preventDefault()
			axios.post(process.env.REACT_APP_BACKEND+'/tits', {params: s})
			.then(function (response) {
				setUser(response.data[0] ? response.data[0].age : 'none')
			})
			.catch(function (err) {
				console.log(err);
			});	}

		return(
			<div>
				<Form>
					<Input onChange={(e)=>setString(e)} onPressEnter={(e)=>logChange(e)}>

					</Input>
				</Form>
				<b>{s}</b>
				<b>{user}</b>
				<Table rowKey='_id' dataSource={userTable} columns={columns}/>
			</div>
		)
	}

	const Bear = () => {
		return(<div>BEAR</div>)
	}

	return (
		<div 
		onClick={()=> (menuVisibility === "menu preload_menu" || menuVisibility === "menu inactive_menu")?null:dispatch(toggleNavMenuState("menu inactive_menu"))}
		style={{
			paddingTop: '60px',
			paddingLeft: '25px', 
			paddingRight: '25px',
			paddingBottom: '60px',
			overflowY: 'visible', 
			WebkitOverflowScrolling: "touch", 
			overflowWrap: 'break-word',
			width: '100%',
		}}>
			<Switch>
				<Route path="/test">
						<div style={{overflowWrap: 'normal', fontSize: '20vw'}}>TESTING</div>
				</Route>
				<Route path="/bear">
					<Bear/>
				</Route>
				<Route path="/mama">
					<Mama/>
				</Route>
				<Route path="/papa">
					<Papa/>
				</Route>
				<Route path="/panel">
					<Panel/>
				</Route>
				<Route path="/">
					{a.map(i=><div key={i}>{i}</div>)}
				</Route>
			</Switch>
		</div>
	)
}

export default Homepage;
