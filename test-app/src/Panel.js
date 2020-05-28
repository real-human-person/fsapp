import React, {useState, useEffect} from 'react'

import './customCSS.css'

import {Input, Button} from 'antd'

import * as BABYLON from 'babylonjs'

import {
	ArrowUpOutlined,
	ArrowDownOutlined,
	MailOutlined,
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons'

const axios = require('axios')

const Panel = () => {






    const [commentVisible, setCommentVisible] = useState(false)

    const [commentTable, setCommentTable] = useState([])

    const [comment, setComment] = useState({})

    const dragElement = (elmnt) => {

        if(elmnt){
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            //if (document.getElementById(elmnt.id + "mover")) {
                // if present, the header is where you move the DIV from:
              //  document.getElementById(elmnt.id + "mover").onmousedown = dragMouseDown;
            //} else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
           //} 
            function dragMouseDown(e) {
                e = e || window.event;
                if(e.target === elmnt || e.target.id === 'mover'){
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                }
            }
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }

    const getComments = () => {
	console.log("getting comments")
        axios.get(process.env.REACT_APP_BACKEND+'/comments').then((res)=>{
		console.log(res)
			console.log(res.data)
			setCommentTable(res.data)
		}).catch((err)=>{
			console.log(err)
		})
    }
    useEffect(()=>{
	console.log("effect")
        getComments()
	const canvas = document.getElementById('canvas')
	//const ctx = canvas.getContext('2d')
	//ctx.fillStyle = 'green'
	//ctx.fillRect(10,10,150,100)
	var engine = new BABYLON.Engine(canvas,true)
	// You have to create a function called createScene. This function must return a BABYLON.Scene object
// You can reference the following variables: scene, canvas
// You must at least define a camera

	    
/**************************END-EVENTS***************************/

/********************BOAT-ANIMATIONS*********************************/
function onKeyDownEvt(e) {  
    // console.log(e.keyCode); //Diagnostic: keep off for performance. 
    // console.log(String.fromCharCode(e.keyCode)); //Diagnostic: keepoff for performance. 
    switch (e.keyCode) {
        case 87: //'w':
        case 69: //'e':
        case 81: //'q':
            break;
        // case 88: //'x'
        case 90: //'z'
            break;
        case 65: //'a'
            movementKeys.left=1;
        case 37: //'leftarrow': 
        break;
        case 68: //'d'
            movementKeys.right=1;
            // movementKeys.left=0;
        case 39: //'rightarrow':
        break;
        case 40: //'downarrow':
        break;
        case 38: //'uparrow':
        break;
        case 83:   //s   
            movementKeys.fwd=1;
            break;
        case 32: // SPACE
        break;
        case 88://x  
        case 40://numpad2s 
            movementKeys.fwd=0;
        break;
    }    
}
function onKeyUpEvt(e){  
    // DIAGNOSTICS: keep but, keepout for performance. 
    // var char = String.fromCharCode(e.keyCode);
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 87: //'w':
        case 81: //'q':
        break;
        case 88: //'x':
        case 90: //'z':
        break;
        case 65: //'a'
            movementKeys.left=0;
        case 37: //'leftarrow':
        break;
        case 68: //'d'
            movementKeys.right=0;
        case 39: //'rightarrow':
        break;
        case 40: //'downarrow':
        break;
        case 38: //'uparrow':
        break;
        case 83: //'S':
            movementKeys.fwd=0;        
        break;
        case 32: // SPACE              
        break;
    } 
    //NUMPAD-CHARACTER-CODES!
    //1:35,2:40,3:34,4:37,5:12,6:39,7:36,8:38,9:33,0:45,+:107,-:109.  
}

/******************************* - ANIMATIONS - *********************************/
var animateMovement = function(){

    var moveX = 0, moveZ = 0;
    var moveY = -0.5; //gravity

    var turnSpeedControl = 0.02;

    if(movementKeys.left){
        boat.rotation.y -= turnSpeedControl;
        box.rotation.y -= turnSpeedControl;
    } else if(movementKeys.right){
        boat.rotation.y += turnSpeedControl;
        box.rotation.y += turnSpeedControl;
    }

    if (movementKeys.fwd) { //move forward
        var speedGovernor = 6;
        moveX = parseFloat(Math.sin(parseFloat(box.rotation.y))) / speedGovernor; //divided sin cos speed reduction 0.5 fast /0.9 slow
        moveZ = parseFloat(Math.cos(parseFloat(box.rotation.y))) / speedGovernor; //divide 3 pretty slow
    }
        /************JUMP***************/

    var animo;

    if(jumpMode){
    }else if(movementKeys.fwd || movementKeys.left ||movementKeys.right  || fallMode){
        box.moveWithCollisions(new BABYLON.Vector3( moveX, moveY, moveZ )); //todo reuse vector obj?
    }  
}
	    
	    var box;
var boat;
var createScene = function() {
	var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 1, 20, new BABYLON.Vector3(10, 0, 0), scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
    light.intensity = 0.7;

    var pl = new BABYLON.PointLight("pl", new BABYLON.Vector3(0, 0, 0), scene);
    pl.diffuse = new BABYLON.Color3(0.8, 0.5, 1);
    pl.specular = new BABYLON.Color3(0, 0, 1);
    pl.intensity = 0.8;

    var mat = new BABYLON.StandardMaterial("mat1", scene);
    mat.alpha = 1.0;
    mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat.backFaceCulling = false;
    var texture = new BABYLON.Texture("https://i.imgur.com/ZUWbT6L.png", scene);
    texture.vScale = 1.0; //How many images span the surface.
    texture.uScale = 30.0; //Lots of images squashed and stretched makes an interesting effect...
    mat.diffuseTexture = texture;

    var paths = [];
    
    // sinus wave
    for (var p = -50; p < 50; p++) {
        var path = [];
        for (var i = 0; i < 50; i++) {
        var x = i - 25;
        var y =  Math.cos(i / 12) * (p / 5);
        var z = p;
        path.push(new BABYLON.Vector3(x, y, z));
        }
        paths.push(path);
    }
    

    var ribbon = BABYLON.Mesh.CreateRibbon("rib", paths, false, false, 0, scene, true, BABYLON.Mesh.BACKSIDE);
    ribbon.material = mat;

    var positions = ribbon.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    var indices = ribbon.getIndices();
    var model = positions.slice();

    var normals = [];

    var updatePositions = function(model, positions, angle) {
        var delta = angle;
        for (var idx = 0; idx < positions.length; idx += 3) {
        positions[idx + 1] =  Math.sin(delta) * model[idx + 1];
        delta += 0.01;
        }

    };

    var updateRibbon = function(ribbon, positions, normals) {
        ribbon.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions, false, true);
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        ribbon.updateVerticesData(BABYLON.VertexBuffer.NormalKind, normals, false, false);
    };

    var angle = 0;
    var waves = 0;

    scene.registerBeforeRender(function() {
        pl.position = camera.position;
        updatePositions(model, positions, angle);
        updateRibbon(ribbon, positions, normals);
        angle += 0.10;
        waves += 0.0009;
        texture.vOffset = waves;
    });


        box = BABYLON.MeshBuilder.CreateBox("box1", {height:1,width:1,depth:1}, scene);
        box.position.z = 5;
        box.position.y = 3;
        box.position.x = 10;

        boat = BABYLON.MeshBuilder.CreateBox("boat1", {height:1,width:2,depth:3}, scene);
        boat.position.copyFrom(box.position);

        scene.render();

        var ray = new BABYLON.Ray();
        var rayHelper = new BABYLON.RayHelper(ray);
        
        var localMeshDirection = new BABYLON.Vector3(0, -1,0);
        var localMeshOrigin = new BABYLON.Vector3(0, -.4, 0);
        var length = 3;
        
        rayHelper.attachToMesh(box, localMeshDirection, localMeshOrigin, length);
        rayHelper.show(scene);

        var ray2 = new BABYLON.Ray();
        var rayHelper2 = new BABYLON.RayHelper(ray2);

        var localMeshDirection2 = new BABYLON.Vector3(0, -1, 1);
        var localMeshOrigin2 = new BABYLON.Vector3(0, -.4, 0);
        var length2 = 5;
        
        rayHelper2.attachToMesh(box, localMeshDirection2, localMeshOrigin2, length2);
        rayHelper2.show(scene, new BABYLON.Color3(.33,.44,.55));

        var sphere = BABYLON.MeshBuilder.CreateSphere('', {diameter: 1}, scene);
        sphere.setEnabled(true);

        var sphere2 = BABYLON.MeshBuilder.CreateSphere('', {diameter: 1}, scene);
        sphere2.setEnabled(true);

        var offsetPos;
        scene.registerBeforeRender(function(){

            var hitInfo = ray.intersectsMeshes([ribbon]);
            var hitInfo2 = ray2.intersectsMeshes([ribbon]);

            if(hitInfo.length){
                sphere.position.copyFrom(hitInfo[0].pickedPoint);
                var offsetPos = hitInfo[0].pickedPoint;
                offsetPos.y +=2;
                box.position.copyFrom(offsetPos);
                boat.position.copyFrom(box.position);
            }else{
                // sphere.setEnabled(false);
            }
            if(hitInfo2.length){
                var offsetPos2 = hitInfo2[0].pickedPoint;
                offsetPos2.y +=2;
                sphere2.position.copyFrom(offsetPos2);

                boat.lookAt(sphere2.position);

                if(movementKeys.left){
                    boat.rotation.z = -0.2;
                } else if (movementKeys.right) {
                    boat.rotation.z = 0.2;
                }
            }else{
                // sphere2.setEnabled(false);
            }
        });

        scene.registerAfterRender(function() {
            if(boat){
                animateMovement();
            }
        });

	return scene;
};

var jumpMode = 0, jumpIndex = 0, /*jumpMax = 30,*/ preJumpMode = 0, fallMode = 0;//, landMode = 0;
var movementKeys={left:0,right:0,bwd:0,fwd:0,jump:0};
window.addEventListener("keydown", onKeyDownEvt, false);
window.addEventListener("keyup", onKeyUpEvt, false);
window.addEventListener('resize', function(){ 
    engine.resize();
});

	var scene = createScene()
	engine.runRenderLoop(()=>{scene.render()})
	window.addEventListener("resize",()=>{
		engine.resize()
	})
    },[])

    const postComment = (comment, cb) => {
        if(comment.title && comment.comment)
        axios.post(process.env.REACT_APP_BACKEND+'/comments', {params:{userId: '666', title: comment.title, comment: comment.comment}}).then((err,res)=>{
            setCommentVisible(false)
            setComment({})
            cb()
        }).catch(err=>{
            console.log(err)
        })
    }
    
    useEffect(()=>{
        if (commentVisible){
            document.getElementById("commentBox").focus()
            dragElement(document.getElementById("commentBox"));
        }
    },[commentVisible])

    return(
    <div>
	    {commentVisible ? 
            <div
                className='postArea' id='commentBox' 
	            style={{overflow: 'auto',display: 'flex', flexDirection: 'column', alignItems: 'space-between', visibility: commentVisible ? "visible" : "hidden"}}>
            {/* <Icon id="commentBoxmover" type="fullscreen" style={{cursor: 'move', fontSize: '14pt', position: 'absolute', top: '10px', right: '10px', zIndex: 998}}/> */}
	            title
            <Input
                id="comment_title"
                className='customInput'
            ></Input>
            content
            <Input.TextArea
                id="comment_content"
                onKeyPress={(e)=>{
                    if(e.key==="Enter" && e.shiftKey){
                        e.preventDefault()
                        postComment({title: document.getElementById('comment_title').value, comment: document.getElementById('comment_content').value}, ()=>getComments())
                    }
                }}
                className='customInput'
                style={{resize: 'vertical',alignSelf: 'stretch', height: '100%'}}/>
                <div id='mover'>
                    <Button 
                        onClick={(e)=>
                                postComment({title: document.getElementById('comment_title').value, comment: document.getElementById('comment_content').value}, ()=>getComments())
                        } 
                        className='customButton'>Test</Button>
                    <Button 
                        onClick={()=>{setCommentVisible(false);setComment({})}}className='customButton' style={{backgroundColor: '#ff2244'}}>Cancel</Button>
                </div>
        </div> : null}
	    <div className="commentList">
        { 
            commentTable.map((i,c)=>{
                var auxDate = new Date(i.date);
                return (
        
                <div key={i._id}>
                    <div style={{border: '1px solid black', borderRadius: '5px',padding: '8px', margin: '8px', boxShadow: '0px 0px 5px rgba(0,0,0, 0.5)'}}>
                        <div>
                            <b style={{whiteSpace: 'wrap'}}>{i.title}</b><b style={{float: 'right'}}>
                                {auxDate.toLocaleTimeString()} - {auxDate.toDateString()}
                            </b><br/>
                        </div>
                        <div style={{whiteSpace: 'pre-wrap'}}>
                            {i.comment}
                        </div>
                        <div style={{display: 'flex',justifyContent: 'flex-end'}}>
                            <Button className="commentButton" style={{padding: '5px'}} type='link'><ArrowUpOutlined/></Button>
                            <Button className="commentButton" style={{padding: '5px'}} type='link'><ArrowDownOutlined /></Button>
                            <Button className="commentButton" style={{padding: '5px'}} type='link'><MailOutlined/></Button>
                            <Button className="commentButton" style={{padding: '5px'}} type='link'><EditOutlined/></Button>
                            <Button className="commentButton" style={{padding: '5px'}} type='link'><DeleteOutlined/></Button>
                        </div>
                    </div>
    
                </div>)
            }
            ).reverse()
	}                        
	    </div>

	<canvas id="canvas"></canvas>
        
	    
	<div className='footer' style={{
            left: 'auto',
            height: 'auto',
            width: 'auto',
            position: 'fixed',                                                                                                                              
            right: '15px',
            border: ' 1px solid black',
            borderBottom: 'none',
            borderRadius: '15px 15px 0px 0px',
            boxShadow: '0px 0px 5px rgba(0,0,0, 0.5)',
            padding: '12px',
            backgroundColor:'#2244ff'
        }}>
            <Button 
                type='link' 
                style={
                    {
			    width: '40px',
			    textAlign: 'center',
			backgroundColor: 'transparent', 
                        color: '#ffffff', 
                        padding: '0px', 
                        margin: 'auto'
                    }
                } 
                onClick={()=>{setCommentVisible(true)}}>
	    {commentVisible?"Ok":"POST"}
                </Button>
        </div>
    </div>
    )
}

export {Panel}
