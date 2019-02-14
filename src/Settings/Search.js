import React from 'react';
import styled from 'styled-components';
import {backgroundColor2,fontSize2} from '../Shared/Styles'
import {Appcontext} from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';


const SearchGrid = styled.div`
display: grid;
grid-template-columns: 150px 1fr;
`;

const SearchInput = styled.input`
${backgroundColor2}
${fontSize2}
color:white;
height: 25px;
border-radius: 5px;
border: none;
place-self: center left;
`;

//to handle the debounce for the search

const handleFilter =_.debounce((inputValue,coinList,setFilterCoins)=>{
//get all the coinsymbols
let coinSymbols = Object.keys(coinList);
//get the coin names,map symbols to name
let coinNames = coinSymbols.map(sym=>coinList[sym].CoinName)
   
let allStringstoSearch = coinSymbols.concat(coinNames);
let fuzzyResults = fuzzy
.filter(inputValue,allStringstoSearch,{})
.map(results=>results.string)

let filteredCoins = _.pickBy(coinList,(results,symKey)=>{
    let coinName = results.CoinName;
    return (_.includes(fuzzyResults,symKey)|| _.includes(fuzzyResults,coinName))
});
setFilterCoins(filteredCoins);
},500);

function filterCoins(e,setFilteredCoins,coinList){
    let inputValue = e.target.value;
    if(!inputValue){
        setFilteredCoins(null)
        return;
    }
    handleFilter(inputValue,coinList,setFilteredCoins)
}

export default ()=>{
return (
    <Appcontext.Consumer>
    {({setFilteredCoins,coinList})=>
    <SearchGrid>
    Search Coins
    <SearchInput onKeyUp = {(e)=>filterCoins(e,setFilteredCoins,coinList)}/>
    </SearchGrid>
    }
    </Appcontext.Consumer>
)
}
