import {useState} from 'react';
import './App.css';
import shoesData from './data';
import {Routes, Route, Link, useNavigate, Outlet, Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Detail,ShoeList} from './detail';
import axios from 'axios';

function App() {
    const [shoesInfo, InfoSet] = useState(shoesData);
    const navigate = useNavigate();
    const [MoreNum, MoreSet] = useState(0);

    return (
        <div className="App">
            <div className='NavBar'>
                <div onClick={()=>{navigate('/')}} to={'/'} className='NavBtn HomeNav'>Home</div>
                <div onClick={()=>{navigate('/detail')}} to={'/detail'} className='NavBtn detailNav'>detail</div>
                <div onClick={()=>{navigate('/about')}} to={'/about'} className='NavBtn aboutNav'>about</div>
                <div onClick={()=>{navigate('/event')}} to={'/event'} className='NavBtn eventNav'>event</div>
            </div>
            <Routes>
                <Route path='/' element={<Main shoesInfo = {shoesInfo} InfoSet={InfoSet} MoreNum={MoreNum} MoreSet={MoreSet} />}/>
                <Route path='/detail' element={<ShoeList shoesInfo={shoesInfo}/>} />
                <Route path='/detail/:userPar' element={<Detail shoesInfo={shoesInfo} navigate={navigate}/>}></Route>
                <Route path='/about' element={<div className = 'temp' >어바웃</div>}/>
                <Route path='/event' element={<Event navigate={navigate}/>}>
                  <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}/>
                  <Route path='two' element={<div>생일기념 쿠폰</div>}/>
                </Route>
                <Route path='*' element={<div className='temp'>오타났어유</div>}/>
            </Routes>
        </div>
    );
}

function Main(props) {

    return (
        <>
        <div className='mainBox'>
            {props.shoesInfo.map((a, i) => {
                return (
                    <Card shoesInfo={props.shoesInfo[i]}/>
                    )
                })
            }
        </div>
        <button className='MoreBtn' onClick={()=>{
            if(props.MoreNum == 0){
                axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((data)=>{
                let tempShoe = [...props.shoesInfo,...data.data]
                props.InfoSet(tempShoe);
                props.MoreSet(1);
            })
            .catch(()=>{
                console.log('실패');
            })
            }else if(props.MoreNum == 1){
                axios.get('https://codingapple1.github.io/shop/data3.json')
            .then((data)=>{
                let tempShoe = [...props.shoesInfo,...data.data]
                props.InfoSet(tempShoe);
                document.querySelector('.MoreBtn').classList.add('hide')
                props.MoreSet(2);
            })
            .catch(()=>{
                console.log('실패');
            })
            }
            
        }}>더 보기</button>
         </>

    )
}

function Event(props){
  return(
    <div className='EventBox'>
    <div>오늘의 이벤트</div>
    <Outlet></Outlet>
    <button className='EventBtn' onClick={()=>{props.navigate('/event/one')}}>one</button>
    <button className='EventBtn' onClick={()=>{props.navigate('/event/two')}}>two</button>
  </div>
  )
}

function Card(props) {
    return (
        <div className='Shoes'>
            <img src={process.env.PUBLIC_URL + `/shoes${props.shoesInfo.id + 1}.jpg`}/>
            <h4>{props.shoesInfo.title}</h4>
            <p>{props.shoesInfo.price}</p>
        </div>
    )
}

export default App;
