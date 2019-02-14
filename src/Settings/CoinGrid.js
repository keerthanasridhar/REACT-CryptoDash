import React from 'react';
import styled from 'styled-components';
import { Appcontext } from '../App/AppProvider';
import CoinTile from './CoinTile'


export const CoinGridStyled = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,minmax(100px, 1fr));
grid-gap: 14px;
margin-top: 10px;git 
`;

function getLowerCoinsToDisplay(coinList,filteredCoins){
return (filteredCoins && Object.keys(filteredCoins)) ||
 Object.keys(coinList).slice(0,100)
}

function  getCoinsToDisplay(coinList,topSection,favorites,filterCoins){
return topSection ? favorites : getLowerCoinsToDisplay(coinList,filterCoins) 
}

export default function({topSection}){
return (
    <Appcontext.Consumer>
    {({coinList,favorites,filteredCoins})=> (
        <CoinGridStyled>
    {getCoinsToDisplay(coinList,topSection,favorites,filteredCoins).map(coinkey =>
         <CoinTile key = {coinkey} favorites = {favorites} topSection = {topSection} coinkey ={coinkey} /> 
        )}
    </CoinGridStyled>
    )
}
    </Appcontext.Consumer>
);
}




