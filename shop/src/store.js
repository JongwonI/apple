import { configureStore, createSlice } from '@reduxjs/toolkit'


let user = createSlice({
    name : 'user',
    initialState:{name:'kim',age:20},
    reducers : {
        userSet(state){
            state.age++
        }
    }
})
let stock = createSlice({
    name :'stock',
    initialState:[
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ] ,
    reducers : {
        StockSet(state,action){
          let addIndex = state.findIndex((a)=>{return a.id === action.payload})
          state[addIndex].count++
        },
        addItem(state,action){
          state.push(action.payload)
        }
    }
})



export default configureStore({
  reducer: {
    stock : stock.reducer,
    user : user.reducer
   }
}) 

export let {StockSet,addItem} = stock.actions
export let {userSet} = user.actions