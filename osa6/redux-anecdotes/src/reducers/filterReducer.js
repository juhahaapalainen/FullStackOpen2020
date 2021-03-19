

const filterReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch(action.type) {
        case 'SETFILTER': {

            console.log('filter', action.filter)
            // return state
             return action.filter
            
        }
               
        default:
            return state
    }
    
   
}

export const setFilter = filter => {
    return{
        type: 'SETFILTER',
        filter: filter
    }
}




export default filterReducer