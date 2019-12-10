import { ADD_PLACE, SET_PLACE } from "./places-actions"
import Place from '../models/Place'




const initialState ={
    places:[]
}

export default (state=initialState , action) =>{
  switch(action.type){
    case SET_PLACE:
      return{
        places:action.places.map(pl => new Place( pl.id.toString() , pl.title , pl.imageUri, pl.address , pl.lat ,pl.lng) )
      }
      case ADD_PLACE:
            const newPlace= new Place(action.PlaceData.id.toString() , action.PlaceData.title, action.PlaceData.image ,
            action.PlaceData.address , action.PlaceData.coords.lat , action.PlaceData.coords.lng )
            return{
                places:state.places.concat(newPlace)
            }
          default:
              return state
  }

}