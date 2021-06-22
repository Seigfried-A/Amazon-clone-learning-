import * as actionTypes from './actionTypes'

export const addToBasket = ( item ) => {
    return {
        type: actionTypes.ADD_TO_BASKET,
        item: item
    }
}

export const removeFromBasket = (id) => {
    return {
        type: actionTypes.REMOVE_FROM_BASKET,
        id: id
    }
}

export const emptyBasket = () => {
    return {
        type: actionTypes.EMPTY_BASKET
    }
}