import {useParams} from 'react-router-dom';

function Detail(props) {

    let {userPar} = useParams();
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
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;