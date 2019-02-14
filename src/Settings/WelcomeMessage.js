import React from 'react';
import {Appcontext} from '../App/AppProvider'

export default function ({firstVisit}){
    return (
<Appcontext.Consumer>
{({firstVisit})=>
firstVisit ? <div>
 Welcome to cryptoDash,please select your favortite coins to begin.
 </div>
: null 
}
</Appcontext.Consumer>
    );
  };