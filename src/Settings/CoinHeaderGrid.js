import React from 'react'
import styled from 'styled-components';
import {Deleteabletile} from '../Shared/Tile'

export const CoinHeaderGridStyled = styled.div`
display: grid;
grid-template-coulumns: 1fr 1fr;
`;

export const CoinSymbol = styled.div`
justify-self:right;
`;

export const DeleteIcon = styled.div`
justify-self:right;
display: none;
${Deleteabletile}: hover & {
    display: block;
    color:red;
}
`;
export default function({name,symbol,topSection}){
    return <CoinHeaderGridStyled>
    <div>{name} </div>
    { topSection ?
         (<DeleteIcon>X</DeleteIcon>) : (<CoinSymbol>{symbol}</CoinSymbol>)
}
    
    </CoinHeaderGridStyled>
}