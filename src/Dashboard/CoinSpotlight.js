import React from 'react';
import styled from 'styled-components'
import {Appcontext} from '../App/AppProvider';
import {Tile} from '../Shared/Tile';
import CoinImage from '../Shared/CoinImage';


const CoinHead = styled.div`
text-align: center;
margin:auto;
display:block;
`; 

export default function(){
   return (
<Appcontext.Consumer>
{({currentFavourites,coinList})=>
    <Tile>
    <CoinHead> {coinList[currentFavourites].CoinName}</CoinHead>
    <CoinImage  spotlight coin={coinList[currentFavourites]}/>
    </Tile>   
}
</Appcontext.Consumer>
   )
  
}

