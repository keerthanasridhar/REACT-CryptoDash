import React from 'react';
import { Appcontext } from '../App/AppProvider';
import { Selectabletile,Deleteabletile, DisabledTile } from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

function clickCoinHnadler(topSection,coinkey,addCoin,removeCoin){
    return topSection ? () =>{
        removeCoin(coinkey)
    } : ()=>{
        addCoin(coinkey)
    }
}


export default function({coinkey, topSection}){
    

    return <Appcontext.Consumer>
    {({coinList,addCoin,removeCoin,isInFavorites})=>{

        let coin = coinList[coinkey];

        let TileClass = Selectabletile;
        if(topSection){
            TileClass = Deleteabletile;
        } else if (isInFavorites(coinkey)){
            TileClass = DisabledTile;
        }
        return <TileClass onClick ={clickCoinHnadler(topSection,coinkey,addCoin,removeCoin)}
        >
        <CoinHeaderGrid topSection = {topSection} 
        name = {coin.CoinName} symbol ={coin.Symbol}/>
        <CoinImage topSection = {topSection} coin = {coin}/>
        </TileClass>
    }}
    </Appcontext.Consumer>
}




