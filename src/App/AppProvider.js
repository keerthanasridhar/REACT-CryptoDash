import React from 'react';
import _ from 'lodash';
import moment from 'moment';
const cc = require('cryptocompare');


const MAX_FAVORTITES = 10;
const TIME_UNITS = 10;
export const Appcontext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props){   
        super(props);
        this.state = {
            page: 'settings',
            favorites:['BTC','XRP'],
            ...this.savedSetting(),
            setPage: this.setPage,
            timeInterval:"months",
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            filteredCoins: this.filteredCoins,
            confirmFavorites:this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
            setCurrentFavorite: this.setCurrentFavorite,
            changeChartSelect: this.changeChartSelect
        }
    }

    componentDidMount = ()=>{
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistoric();
    }

    addCoin = key =>{
        let favorites = [...this.state.favorites]
        if(favorites.length <= MAX_FAVORTITES){
            favorites.push(key);
            this.setState({favorites})
        }
    }
    removeCoin = key =>{
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites,key)})
    }

    isInFavorites = key => _.includes(this.state.favorites,key)
    
    fetchCoins = async ()=>{
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList})
        
    }

    fetchPrices = async  ()=>{
        if(this.state.firstVisit) return;
        let prices = await this.prices();

        this.setState({prices})
    }

    fetchHistoric = async ()=>{
        if(this.state.firstVisit) return;
        let results = await this.historical();
       let historical =[
           {
            name: this.state.currentFavorites,
            data: results.map((ticker,index)=> [
                moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(),
                ticker.USD
            ])
       }]
       console.log(this.state)

        this.setState({historical});
   
    }

    prices = async ()=>{
        let returnData = [];
        for(let i=0;i<this.state.favorites.length;i++){
            try{
                let pricesData = await cc.priceFull(this.state.favorites[i],'USD')
                returnData.push(pricesData)
            } catch(e){
                console.warn('Fetch price error:',e)
            }
        }
        return returnData;
    } 

    historical = () =>{
        let promises = [];
        for(let units = TIME_UNITS; units > 0; units--){
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavourites,
                    ['USD'],
                    moment()
                    .subtract({ [this.state.timeInterval]:units })
                    .toDate()
                )
            )
        }
        return Promise.all(promises);
        }

    confirmFavorites=()=>{
        let currentFavourites = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavourites,
            prices:null,
            historical: null
        },()=>{
            this.fetchPrices();
            this.fetchHistoric()
        })
       
        localStorage.setItem('cryptoDash',JSON.stringify({
            favorites: this.state.favorites,
            currentFavourites   
        }))
    }

    setCurrentFavorite = (sym)=>{
        this.setState({
            currentFavourites: sym,
            historical :null
        },this.fetchHistoric)
        localStorage.setItem('cryptoDash',JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavourites:sym
        }))
    }

    savedSetting(){
       
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData){ 
            return { firstVisit: true,
                page: 'settings',
                currentFavourites
            }    
        } 
       
        let {favorites,currentFavourites}  = cryptoDashData;
   
            return {favorites,currentFavourites}
    }

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

    setPage = page => {
      
        this.setState({page})

    }
    
    changeChartSelect = (value)=>{
        this.setState({timeInterval:value,historical:null},this.fetchHistoric)
    }
    render() {
        return (
            <Appcontext.Provider value={this.state}>
            {this.props.children}
            </Appcontext.Provider>  
        )
    }
}

