import highchartsConfig from './HighchartConfig';
import React from 'react';
import {Tile} from '../Shared/Tile';
import {Appcontext} from '../App/AppProvider';
import ReactHighcharts from 'react-highcharts'
import HighchartTheme from './HighchartTheme';
import ChartSelect from './ChartSelect';

ReactHighcharts.Highcharts.setOptions(HighchartTheme);

export default function(){

    return ( 
        <Appcontext.Consumer>
{({historical,changeChartSelect,timeInterval}) =>
<Tile>
<ChartSelect
onChange = {e=> changeChartSelect(e.target.value)}
defaultValue = {timeInterval}
> 
<option value = "weeks"> Weeks</option>
<option value = "days" > Days</option>
<option  value = "months" > Months</option>

</ChartSelect>
{historical ? <ReactHighcharts config = {highchartsConfig(historical)}/> : <div>Loading...</div>}
</Tile>
}
</Appcontext.Consumer> )
}
    

