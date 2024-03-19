import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {StockSet,userSet} from './store'

function Cart(){

    let state = useSelector((state)=>{return state})
    let dispatch = useDispatch()
    return(
        <>
            {state.user.name}({state.user.age}세)의 장바구니
            <button onClick={()=>{
                 dispatch(userSet())
            }}>+</button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                {
                    state.stock.map((a,i)=>{
                        return (
                    <tbody>
                        <tr>
                        <td>{i}</td>
                        <td>{a.name}</td>
                        <td>{a.count}</td>
                        <td><button onClick={()=>{
                            dispatch(StockSet())
                        }}>+</button></td>
                        </tr>
                    </tbody>
                        )
                    })
                }
                
            </Table> 
        </>
    )
}

export default Cart;