import React,{useState, useCallback} from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import Colors from '../constants/Colors'
import {useDispatch} from'react-redux'
import * as placesActions from '../store/places-actions'
import ImagePicker from '../compenents/ImagePicker'
import LocationPicker from '../compenents/LocationPicker'

const NewPlaceScreen = (props) => {
    const dispatch = useDispatch()
const [titleValue , setTitleValue]= useState('')
const [selectedImage,setSelectedImage]=useState(null)
const [selectedLocation , setSelectedLocation]= useState()

const locationPickedHandler= useCallback(location => {
    setSelectedLocation(location)
    console.log('Location====>', location)
},[])

const imageTakenHandler = imagePath =>{
    setSelectedImage(imagePath)

}

const savePlaceHandler = () =>{
  dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation))
  props.navigation.goBack()
}

textChangeHandler= text =>{
    setTitleValue(text)
}


    return (
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.TextInput} 
             value={titleValue} 
             onChangeText={textChangeHandler}
              />
              <ImagePicker onImageTaken={imageTakenHandler}/>
              <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
            <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler} />
        </View>
    )
}



NewPlaceScreen.navigationOptions={
    headerTitle: 'Add an new place'
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        margin:30
    },
    label:{
     fontSize:18 ,
     marginBottom:15
    },
    TextInput:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1 ,
        marginBottom:15 ,
        paddingVertical:4 ,
        paddingHorizontal:2
    }
})


export default NewPlaceScreen