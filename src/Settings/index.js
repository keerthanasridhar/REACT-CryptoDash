import React from 'react'
import Welcome from './WelcomeMessage'
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import CoinGrid from '../Settings/CoinGrid';
import Search from '../Settings/Search';

export default function (){
    return <Page name="settings">
    <Welcome/>
    <CoinGrid topSection/>
    <ConfirmButton/>
    <Search/>
    <CoinGrid/>
    </Page> 
}