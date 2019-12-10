export const ADD_PLACE = 'ADD_PLACE'
import * as FileSystem from 'expo-file-system'
import { insertPlace, fetchPlaces } from '../helpers/db'
export const SET_PLACE= 'SET_PLACE'
import ENV from '../env'


export const addPlace = (title, image, location) => {
    return async dispatch => {
       response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            location.lat
          },${location.lng}&key=${ENV.googleApiKey}`
    )
    if(!response.ok){
        throw new Error('Something went Wrong')
    }
    const resData= await response.json()
    if(!resData.results){
        throw new Error('Somethign went wrong')
    }
    console.log('resData ====>', resData)
    const address=  'dummyAddress need API key' 
    //  resData.results[0].formatted_address  the Api address format result

        fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName


        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng)
            console.log(dbResult)
            dispatch({ type: ADD_PLACE, PlaceData: { id: dbResult.insertId, title: title, image: newPath, address:address ,
            coords:{
               lat:location.lat ,
               lng:location.lng 
            } } })
        } catch (err) {
            console.log(err)
            throw err
        }

    }

}

export const loadPLaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces()
            console.log(dbResult)
            dispatch({ type: SET_PLACE, places:dbResult.rows._array })
        } catch (err) {
            throw err
        }
    }
}