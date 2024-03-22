import { useEffect, useState } from 'react';
import {json, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {Nav, Tab} from 'react-bootstrap';
import {useDispatch} from 'react-redux'
import {addItem} from './store';



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
    let [Tab,SetTab] = useState(0);
    let {userPar} = useParams();
    let navigate = props.navigate;
    userPar = props.shoesInfo[userPar].id;
    let [scale,Setscale] = useState('');
    let dispatch = useDispatch()
    useEffect(()=>{
        Setscale('scale1')
        let tempData = JSON.parse(localStorage.getItem('watched'))
        tempData.push(props.shoesInfo[userPar].title)
        localStorage.setItem('watched',JSON.stringify(tempData))
    })
    return (
        <div className={`container scale0 ` + scale}>
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + `/shoes${parseInt(userPar) + 1}.jpg`} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoesInfo[userPar].title}</h4>
                    <p>{props.shoesInfo[userPar].content}</p>
                    <p>{props.shoesInfo[userPar].price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem({id:props.shoesInfo[userPar].id,name:props.shoesInfo[userPar].title,count : 1}))
                    }}>주문하기</button>
                </div>
            </div>
            <Btn bg={'#333'} onClick={()=>{navigate(-1)}}>《 Back</Btn>
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                <Nav.Link eventKey="link0" onClick={function(){SetTab(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link1" onClick={function(){SetTab(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link2" onClick={function(){SetTab(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
          <TabContent Tab = {Tab}></TabContent>
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
function TabContent({Tab}){
    let [Tabfade,setTabfade] = useState('');
    useEffect(()=>{
        let a = setTimeout(() => {setTabfade('end');}, 10);
        return ()=>{
            clearTimeout(a);
            setTabfade('');
        }
    },[Tab])
    if(Tab == 0){
        return <div className={`start ` + Tabfade}>내용0</div>
        
    }else if(Tab == 1){
        return <div className={`start ` + Tabfade}>내용1</div>
        
    }else if(Tab == 2){
        return <div className={`start ` + Tabfade}>내용2</div>
        
    }
}




export {Detail,ShoeList};