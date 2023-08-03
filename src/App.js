import React, {useState} from "react";
import './App.css';

function App() {
  return (
    <div className="container">
        <h1>hello world</h1>
        <FuncComp initNumber={2}/>
        <ClassComp initNumber={2}/>
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

// class >> 메소드를 정의해야 함 (다양한 기능)
class ClassComp extends React.Component {
    // state 초기화
    state = {
        number: this.props.initNumber
    }

    render() {
        return (
            <div className="container">
                <h2>class style component</h2>
                {/* state 값 사용 */}
                <p>Number : {this.state.number}</p>
                <input type="button" value="random" onClick={
                    function () {
                        this.setState({number:Math.random()});
                    }.bind(this)
                }/>
            </div>
        );
    }
}

// hook >> function 방식에서 class를 사용할 수 있게 됨.
function HookComp(props) {
    var numberState = useState(props.initNumber);
    var number = numberState[0];
    var setNumber = numberState[1];

    return (
        <div className="container">
            <h2>hook style component</h2>
            <p>Number : {number}</p>
            <input type="button" value="random" onClick={
                function () {
                    setNumber(Math.random());
                }
            }/>
        </div>
    );
}

export default App;
