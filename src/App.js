import React, {useState, useEffect} from "react";
import './App.css';

function App() {
    var [funcShow, setFuncShow] = useState(true);
    var [classShow, setClassShow] = useState(true);
    return (
        <div className="container">
            <h1>hello world</h1>
            {/* 버튼 클릭 시 하위 컨포넌트 들이 사라지게 하기 */}
            <input type="button" value="remove" onClick={
                function () {
                    setFuncShow(false);
                    setClassShow(false);
                }
            }/>
            {funcShow ? <FuncComp initNumber={2}/> : null}
            {classShow ? <ClassComp initNumber={2}/> : null}
            <HookComp initNumber={2}/>
        </div>
    );
}

// function >> return (간단하게 사용)
function FuncComp(props) {
    return (
        <div className="container">
            <h2>function style component</h2>
            <p>Number : {props.initNumber}</p>
        </div>
    );
}

var classStyle = 'color: red'
// class >> 메소드를 정의해야 함 (다양한 기능)
class ClassComp extends React.Component {
    // state 초기화
    state = {
        number: this.props.initNumber,
        date: ""
    }

    /** react lifecycle >> class로 구현 가능 */
    // render 되기 전 실행
    componentWillMount() {
        console.log("%cclass=> componentWillMount", classStyle);
    }

    // render 후 실행 ( 화면에 그려진 후 추가적으로 DOM을 처리할 일이 있다면 )
    componentDidMount() {
        console.log("%cclass => componentDidMount", classStyle);
    }

    // render를 호출할 필요가 있냐없냐
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("%cclass => shouldComponentUpdate", classStyle);
        // return ? render 호출 : render 호출 안 함
        return true;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("%cclass => componentWillUpdate", classStyle);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("%cclass => componentDidUpdate", classStyle);
    }
    /** react lifecycle */

    render() {
        console.log("%cclass => render", classStyle);
        return (
            <div className="container">
                <h2>class style component</h2>
                {/* state 값 사용 */}
                <p>Number : {this.state.number}</p>
                <p>Date: {this.state.date}</p>
                <input type="button" value="random" onClick={
                    function () {
                        this.setState({
                            number: Math.random(),
                            date: new Date().toLocaleDateString()
                        });
                    }.bind(this)
                }/>
                <input type="button" value="date" onClick={
                    function () {
                        this.setState({
                            date: new Date().toLocaleDateString()
                        });
                    }.bind(this)
                }/>
            </div>
        );
    }
}


var funcStyle = 'color: blue';
var funcId = 0;

// hook >> function 방식에서 class를 사용할 수 있게 됨.
function HookComp(props) {
    var numberState = useState(props.initNumber);
    var number = numberState[0];
    var setNumber = numberState[1];

    var [date, setDate] = useState("");

    //render가 끝났을 때 실행 + render가 실행될 때마다 실행
    // useEffect(side effect) = (componentDidMount & componentDidUpdate)
    useEffect(function () {
        console.log("%cuseEffec1", funcStyle);
        document.title = `${number}+ : + ${date}`;

        // clean up할 때 return 사용. 이 함수가 다시 실행될 때 실행 시켜줌 (정리정돈의 작업 수행)
        // (=componentWillUnMount)
        return function () {
            console.log("%cuseEffec-return", funcStyle);
        }
    },[number]); // 배열 안의 원소가 바뀌었을 때만 해당 함수가 실행 ( number가 수정됐을 때만 호출 )

    // 여러 개도 실행 가능
    useEffect(function () {
        console.log("%cuseEffec2", funcStyle);
        document.title = `${number}+ : + ${date}`;

        // 이 함수가 다시 실행될 때 실행 시켜줌 (정리정돈의 작업 수행: clean up)
        // return function () {
        //     console.log("%cuseEffec-return", funcStyle);
        // }
    },[date]); // 배열 안의 원소가 바뀌었을 때만 해당 함수가 실행 ( date가 수정됐을 때만 호출 )

    console.log("%cfunc => render " + (++funcId), funcStyle);

    return (
        <div className="container">
            <h2>hook style component</h2>
            <p>Number : {number}</p>
            <p>Date: {date}</p>
            <input type="button" value="random" onClick={
                function () {
                    setNumber(Math.random());
                }
            }/>
            <input type="button" value="date" onClick={
                function () {
                    setDate(new Date().toLocaleDateString());
                }
            }/>
        </div>
    );
}

export default App;
