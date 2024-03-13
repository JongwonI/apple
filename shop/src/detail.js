import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';



let Btn =styled.button`
    background:${ props => props.bg};
    color:${ props => props.bg == '#333' ? '#fff' : '#333' };
    border : 2px solid #eee;
    border-radius : 10px;
    padding : 5px 10px 5px 5px ;
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%,-50%);
`
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
            <Btn bg={'#333'} onClick={()=>{navigate(-1)}}>《 Back</Btn>
        </div>
    )
}

function ShoeList(props){
    let [Alert,SetAlert]=useState(true);
    useEffect(()=>{
        let Timer = setTimeout(() => { SetAlert(false); }, 2000);
        return ()=>{
            clearTimeout(Timer);
        }
    }, [])
    return(
       <div className='mainBox'>
        {Alert == true ? <Btn bg={'#333'}>2초 이내에 구매시 할인</Btn> : null}
         {
            props.shoesInfo.map(function(a,i){
                return(
                    <div>
                    <div className="col-lg-4">
                        <img src={process.env.PUBLIC_URL + `/shoes${parseInt(a.id)+1}.jpg`} width="100%"/>
                        <h2 className="fw-normal">{a.title}</h2>
                        <p>{a.content}</p>
                        <p>{a.price}</p>
                        <p><a className="btn btn-secondary" href={`/detail/${a.id}`}>View details »</a></p>
                    </div>
                </div>
                )
             })
         }
       </div>
    )
}

export {Detail,ShoeList};