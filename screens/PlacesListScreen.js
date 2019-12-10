import React,{useEffect} from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import {HeaderButtons , Item } from 'react-navigation-header-buttons'
import {useSelector, useDispatch} from 'react-redux'

import HeaderButton from '../compenents/HeaderButton'
import PlaceItem from '../compenents/PlaceItem'
import * as placesActions from '../store/places-actions'

const PlacesListScreen= (props) => {
  const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)
useEffect(()=>{
  dispatch(placesActions.loadPLaces())
}, dispatch)

    return (
      <FlatList data={places} keyExtractor={item => item.id} renderItem={itemData=>
         <PlaceItem 
         image={itemData.item.imageUri}
         address={itemData.item.address}
         onSelect={() =>{
         props.navigation.navigate('Detail', {placeTitle:itemData.item.title , placeId:itemData.item.id})
         }}
         title={itemData.item.title} /> } />
    )
}

  

PlacesListScreen.navigationOptions= navData => {
    return{
    headerTitle: 'All Places',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
                navData.navigation.navigate('newPlace');
            }}
          />
        </HeaderButtons>
      )
  
    }}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})


export default PlacesListScreen