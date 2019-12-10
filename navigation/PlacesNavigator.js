import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {Platform} from 'react-native'

import MapScreen from  '../screens/MapScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import PlacesListScreen from '../screens/PlacesListScreen'
import Colors from '../constants/Colors'

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    Map:MapScreen ,
    newPlace:NewPlaceScreen ,
    Detail:PlaceDetailScreen ,
    
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? Colors.primary :''
        } ,
        headerTintColor:Platform.OS==='android' ? 'white' :Colors.primary
    }
}
)


export default createAppContainer(PlacesNavigator)