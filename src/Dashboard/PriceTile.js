import React from 'react';
import styled,{css} from 'styled-components';
import {Selectabletile} from '../Shared/Tile';
import {fontSize3,fontSizeBig,colorBoxShadow} from '../Shared/Styles';
import {CoinHeaderGridStyled} from '../Settings/CoinHeaderGrid';
import {Appcontext} from '../App/AppProvider';

const JustifyRight = styled.div`
justify-self: right;
`;

const JustifyLeft = styled.div`
justify-self: left;
`
;

const TickerPrice = styled.div`
${fontSizeBig};
`;

const ChangePC = styled.div`
color: green;
${props=>props.red && css`
color: red;
`}
`;

const numberFormat = number =>{
    return +(number + '').slice(0,7)
}

const PriceTileStyled = styled(Selectabletile)`
${props=> props.compact && css`
display: grid;
${fontSize3}
grid-gap:5px;
grid-template-columns: repeat(3 ,1fr);
justify-items: right;
`}
${props => props.currentFavourites && css`
${colorBoxShadow}
pointer-events: none;
`}
`;


function ChangePercent({data}){
    return (
    <JustifyRight>
    <ChangePC red = {data.CHANGEPCT24HOUR < 0}>
    {numberFormat(data.CHANGEPCT24HOUR)}%
    </ChangePC>
    </JustifyRight>
    )
}

function PriceTile({sym,data,currentFavourites,setCurrentFavorite}){
    return(
        <PriceTileStyled onClick = {setCurrentFavorite} currentFavourites = {currentFavourites}>
        <CoinHeaderGridStyled>
        <div>{sym}</div>
        <ChangePercent data={data}/>
        </CoinHeaderGridStyled>
        <TickerPrice>
        ${numberFormat(data.PRICE)}
        </TickerPrice>
        </PriceTileStyled>
    );
}

function PriceTileCompact({sym,data,currentFavourites,setCurrentFavorite}){
    return (
        <PriceTileStyled onClick = {setCurrentFavorite} compact currentFavourites ={currentFavourites}>
        <JustifyLeft>{sym}</JustifyLeft>
       <ChangePercent data={data}/>
        <div>
        ${numberFormat(data.PRICE)}
        </div>
        </PriceTileStyled>
    )
}

export default function({price,index}){
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];
    let TileClass = index < 5 ? PriceTile : PriceTileCompact;
return(
    <Appcontext.Consumer>
    { ({currentFavourites,setCurrentFavorite})=> 
    <TileClass sym = {sym}
     data = {data} 
     currentFavourites = {currentFavourites === sym}
     setCurrentFavorite = {()=>setCurrentFavorite(sym)}
     >
</TileClass>
    } 
    </Appcontext.Consumer>
)
}