import React, {useState , useEffect}from 'react'
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import MapPreview from './MapPreview'


const LocationPicker = props => {
const[pickedLocation, setPickedLocation]= useState()
const [isFetching, setIsFetching]= useState(false)

const mapPickedLocation= props.navigation.getParam('pickedLocation')

const {onLocationPicked}= props

useEffect(()=>{
if(mapPickedLocation){
  setPickedLocation(mapPickedLocation)
  onLocationPicked(mapPickedLocation)
}
},[mapPickedLocation, onLocationPicked])

    const verifyPermissions= async() =>{
        const result = await  Permissions.askAsync(Permissions.LOCATION)
      
      if(result.status !== 'granted'){
       Alert.alert('Insufficient permissions!' , 'you need to grant permissions to get location',[{text:'Okay'}])
       return false
      }
      return true
  }

    const getLocationHandler = async () => {
     const hasPremission = await verifyPermissions()
     if(!hasPremission){
         return 
     }
     try{
         setIsFetching(true)
       const location = await Location.getCurrentPositionAsync({timeout:5000})
    //    console.log(location)
       setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
       })
       props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
       })
     } catch(err){
         Alert.alert('Could not fetch Location', 'Please try again later',[{text:'Okay'}])
     }
     setIsFetching(false)
     }

    const pickOnMapHandler =() => {
        props.navigation.navigate('Map')
    }

    return (
        <View style={styles.locationPicker} >
           <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler} >
        {isFetching ? <ActivityIndicator size='large' color={Colors.primary} /> :<Text>No location chosen yet!</Text>}
        </MapPreview>
        <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    
        </View>
    )
}


const styles = StyleSheet.create({
    locationPicker:{
        marginBottom:15
    },
    mapPreview:{
        marginBottom:10 ,
        width:'100%',
        height:150,
        borderColor:'#ccc',
        borderWidth:1 ,
        
    }, actions:{
       
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  
    }
})


export default LocationPicker