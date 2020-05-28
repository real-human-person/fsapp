import React from 'react';

function InlineDiv(props){ 
	return <div style={{display: 'inline-block', padding: '15px'}}>{props.text}</div>
}

export {InlineDiv};

