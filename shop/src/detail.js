import {useParams} from 'react-router-dom';

function Detail(props) {
    let {userPar} = useParams();
    let navigate = props.navigate;
    userPar = props.shoesInfo[userPar].id;
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + `/shoes${parseInt(userPar) + 1}.jpg`} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoesInfo[userPar].title}</h4>
                    <p>{props.shoesInfo[userPar].content}</p>
                    <p>{props.shoesInfo[userPar].price}</p>
                    <button className="btn btn-danger" >주문하기</button>
                </div>
            </div>
            <button className='BackBtn' onClick={()=>{navigate('/detail')}}>Back</button>
        </div>
    )
}

function ShoeList(props){
    return(
       <div className='mainBox'>
         {
            props.shoesInfo.map(function(a,i){
                return(
                    <div>
                    <div class="col-lg-4">
                        <img src={process.env.PUBLIC_URL + `/shoes${i + 1}.jpg`} width="100%"/>
                        <h2 class="fw-normal">{a.title}</h2>
                        <p>{a.content}</p>
                        <p>{a.price}</p>
                        <p><a class="btn btn-secondary" href={`/detail/${i}`}>View details »</a></p>
                    </div>
                </div>
                )
             })
         }
       </div>
    )
}

export {Detail,ShoeList};