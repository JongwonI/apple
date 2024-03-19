import {Table} from 'react-bootstrap';
import {useSelector} from 'react-redux'
function Cart(){

    let a = useSelector((state)=>{return state})
    console.log(a.stock)
    return(
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
                a.stock.map((b,i)=>{
                    return (
                <tbody>
                    <tr>
                    <td>{i}</td>
                    <td>{b.name}</td>
                    <td>{b.count}</td>
                    <td></td>
                    </tr>
                </tbody>
                    )
                })
            }
            
        </Table> 
    )
}

export default Cart;