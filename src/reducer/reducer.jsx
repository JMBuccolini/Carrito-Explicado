import { TYPES } from "../actions/actions";

export const shoppingInitialState = {
    products: [
        { id: 1, name: "Producto A", price: 10 },
        { id: 2, name: "Producto B", price: 50 },
        { id: 3, name: "Producto C", price: 100 },
        { id: 4, name: "Producto D", price: 150 },
        { id: 5, name: "Producto E", price: 200 },
    ],
    cart: [],
};

export function shoppingReducer(state, action) {
    
    switch (action.type) {



//action={type:'AGREGAR_AL_CARRITO', payload: 3}
        case TYPES.AGREGAR_AL_CARRITO: {

            let newItem = state.products.find( //1. genero una nueva variable, donde voy a guardar el item cuyo id coincida con el requerido
                (product) => product.id === action.payload
            ); 
            //2.Recorro lo que está en state.products para encontrar el producto
            //3. newItem =  { id: 3, name: "Producto C", price: 100 }


            let itemInCart = state.cart.find((item) => item.id === newItem.id); //hacemos una variable, que guarde el item si YA ESTABA EN EL CARRITO
            //Si se llega a encontrar que ya estaba, itemInCart =  { id: 3, name: "Producto C", price: 100 } ---> true
            return itemInCart
                ? {
                    ...state,//me traigo TODO mi state
                    cart: state.cart.map((item) => //Recorro mi carrito y busco el producto
                        item.id === newItem.id //SI ENCUENTRO AL PRODUCTO HAGO ALGO
                            ? { ...item, quantity: item.quantity + 1 }//me traigo EL PRODUCTO y le modifico la prop quantity y le sumo en 1
                            : item
                    ),
                }
                : {
                    ...state, //me traigo todo lo que está en mi estado
                    cart: [...state.cart, { ...newItem, quantity: 1 }], //me traigo todo lo que está en mi carrito, y le agrego el nuevo objeto con la prop
                    //quantity iniciada en 1
                };
        }

        case TYPES.REMOVER_UN_PRODUCTO: {
            let itemToDelete = state.cart.find((item) => item.id === action.payload);

            return itemToDelete.quantity > 1
                ? {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                }
                : {
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.payload)
                };
        }


        //action= {type:'REMOVER_TODOS', payload:5} -->el id del objeto a borrar
        //action.type
        case TYPES.REMOVER_TODOS: {
            return {  //lo que devuelve la función reductora, modifica mi STATE
                ...state,//1. Me traigo TODO lo que está en mi estado llamado STATE
                cart: state.cart.filter(item => item.id !== action.payload)//2. Recorro lo que esté en el carrito
                //cart:[{id:2},{id:3},{id:1}]
            }
        }
        
        //state = {
        //     products:[{},{},{},{},],
        //     cart:[{id:2},{id:5, quantity: 10},{id:3},{id:1}]
        // }



















        case TYPES.VACIAR_CARRITO:{
            return shoppingInitialState
        }
        default:
            return state;
    }
}

