import React from 'react';
import { Appcontext } from '../App/AppProvider';


export default function(props){
    return <Appcontext.Consumer>
    {({coinList,prices,firstVisit})=> {
        if(!coinList){
            return <div>Loading Coins...</div>;
        }
        if(!firstVisit && !prices){
            return <div>Loading Coins...</div>;
        }
        return <div>{props.children}</div>
    }}
    </Appcontext.Consumer>
}