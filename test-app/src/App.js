import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage';

import './customCSS.css'

//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          tig old bitties
//        </a>
//      </header>
//    </div>
//  );
//}

class App extends Component {
	render(){
		return (
				<div>
					<Header/>
					<Homepage/>
					<Footer/>
				</div>	
		)
	}
}





//
//const Homepage = () => {
//	return(<div>TESTED</div>)
//}
//
//module.exports.HomeStage = () => {
//	return(<div>nunya</div>)
//}
//
	//
export default App
