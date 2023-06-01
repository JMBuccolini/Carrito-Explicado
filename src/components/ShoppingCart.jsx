import { TYPES } from "../actions/actions";
import { shoppingReducer } from "../reducer/reducer";
import { shoppingInitialState } from "../reducer/reducer";
import { useReducer } from "react";
import Product from "./Product";
import CartItem from "./CartItem";


export default function ShoppingCart() {

    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
    const { products, cart } = state; //state = {productos:[{},{},{},{}], cart:[]}

    const addToCart = (id) => { dispatch({ type: TYPES.AGREGAR_AL_CARRITO, payload: id }); };

    const deleteFromCart = (id, all = false) => {

        console.log(id, all)

        if (all) {
            dispatch({ type: TYPES.REMOVER_TODOS, payload: id })
        } else {
            dispatch({ type: TYPES.REMOVER_UN_PRODUCTO, payload: id })
        }
    };


    const clearCart = () => {
        dispatch({ type: TYPES.VACIAR_CARRITO });
    };




    return (
        <div>
            <h2>Carrito de Compras</h2>
            <h3>Productos</h3>
            <div>
                {products.map((product) => <Product key={product.id}
                    data={product} addToCart={addToCart} />)}

            </div>
            <h3>Carrito</h3>
            <button onClick={clearCart} >Limpiar Carrito</button>
            <div>
                {cart.map((item, index) => <CartItem key={index}
                    data={item} deleteFromCart={deleteFromCart} />)}

            </div>
        </div>
    )
}