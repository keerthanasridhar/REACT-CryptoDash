import React from 'react'
import styled,{css} from 'styled-components';
import { Appcontext } from './AppProvider';

const Logo = styled.div`
font-size: 1.5rem;
`

const Bar = styled.div`
display: grid;
margin-bottom: 60px;
grid-template-columns: 180px auto 100px 100px;
`;


const ControlButtonElem = styled.div`
cursor:pointer;
${props=>props.active && css `
text-shadow: 0px 0px 160px #32CD32;
`};
${props=>props.hidden && css`
display: hidden
` }
`

function ControlButton({name}){
    return (
        <Appcontext.Consumer>
        {({firstVisit,page,setPage})=>(
        <ControlButtonElem 
        active ={page === name.toLowerCase()}
        onClick = {()=>setPage(name.toLowerCase())}
        hidden = {firstVisit && name === 'dashboard'}
        >
        {toProperCase(name)}
        </ControlButtonElem>
    )}
        </Appcontext.Consumer>
     
    ) 
}


function toProperCase(lower){
return lower.charAt(0).toUpperCase() + lower.substr(1);
}

export default function(){
    return <Bar>
    <Logo>Cryptodash</Logo>
    <div/>
    <ControlButton active name="Dashboard" />
    <ControlButton name = "Settings"/>
    </Bar>
}