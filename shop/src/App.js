import {useState} from 'react';
import './App.css';
import shoesData from './data';
import {Routes, Route, Link, useNavigate, Outlet, Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Detail,ShoeList} from './detail';

function App() {
    const [shoesInfo, InfoSet] = useState(shoesData);
    const navigate = useNavigate();


    return (
        <div className="App">
            <div className='NavBar'>
                <div onClick={()=>{navigate('/')}} to={'/'} className='NavBtn HomeNav'>Home</div>
                <div onClick={()=>{navigate('/detail')}} to={'/detail'} className='NavBtn detailNav'>detail</div>
                <div onClick={()=>{navigate('/about')}} to={'/about'} className='NavBtn aboutNav'>about</div>
                <div onClick={()=>{navigate('/event')}} to={'/event'} className='NavBtn eventNav'>event</div>
            </div>
            <Routes>
                <Route path='/' element={<Main shoesInfo = {shoesInfo} />}/>
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

        <div className='mainBox'>
            {props.shoesInfo.map((a, i) => {
                        return (
                        <Card shoesInfo={props.shoesInfo[i]} i={i}/>
                        )
                    })
            }
        </div>

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
            <img src={process.env.PUBLIC_URL + `/shoes${props.i + 1}.jpg`}/>
            <h4>{props.shoesInfo.title}</h4>
            <p>{props.shoesInfo.price}</p>
        </div>
    )
}

export default App;
