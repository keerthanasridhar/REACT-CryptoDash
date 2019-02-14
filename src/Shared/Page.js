import React from 'react';
import {Appcontext} from '../App/AppProvider';


export default function({name,children}){
    return <Appcontext.Consumer>
    {({page})=>{
        if(page !== name){
            return null;
        }
        return <div>{children}</div>
    }}
    </Appcontext.Consumer>
}