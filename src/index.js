import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Button extends React.Component {
  render() {
    return (
      <button className={this.props.class === "CE" ? 'square-limpa' : 'square'} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Calc extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      v1: 0,
      v2: 0,
      total: 0,
      op: "",
    }
  }

  renderButton(i) {
    if(i === 'CE'){
      return <Button value={i} class="CE" onClick={() => this.handleClick(i)}/>;
    }else{
      return <Button value={i} onClick={() => this.handleClick(i)}/>;
    }
  }
  handleClick(i){
    if(i === '-' || i === '+' || i === '*' || i === '/'){
      const text = parseFloat(document.getElementById('tela').value)
      this.setState({v1:text,op:i});
      document.getElementById('tela').value = "";
    }else if(i === '='){
      const text = parseFloat(document.getElementById('tela').value)
      this.setState({v2:text}, () =>{
        const total = eval(this.state.v1+this.state.op+this.state.v2);
        this.setState({total:total}, () =>{
          console.log(this.state)
          document.getElementById('tela').value = this.state.total;
        }); 
      });
    }else if(i === 'CE'){
      document.getElementById('tela').value = "";
      console.log(document.getElementById('tela').value);

    }else if(i === 'C'){
      this.setState({v1:0,v2:0,total:0,op:""}, () => {
        console.log(this.state)
        document.getElementById('tela').value = "";
      });
    }else{
      document.getElementById('tela').value += i;
    }
  }

  render() {

    return (
      <center>
      <div className="calc">
        <div className="board-row">
            <textarea type="text" name="tela" id="tela" maxLength="11" disabled></textarea>
        </div>
        {/* <div>
            <button className="square-tudo">C</button>
            <button className="square-limpa">CE</button>
        </div> */}
        <div className="board-row">
            {this.renderButton('C')}
            {this.renderButton('CE')}
        </div>
        <div className="board-row">
            {this.renderButton('7')}
            {this.renderButton('8')}
            {this.renderButton('9')}
            {this.renderButton('/')}
          </div>
          <div className="board-row">
            {this.renderButton('4')}
            {this.renderButton('5')}
            {this.renderButton('6')}
            {this.renderButton('*')}
          </div>
          <div className="board-row">
            {this.renderButton('1')}
            {this.renderButton('2')}
            {this.renderButton('3')}
            {this.renderButton('-')}
          </div>
          <div className="board-row">
            {this.renderButton('0')}
            {this.renderButton('.')}
            {this.renderButton('=')}
            {this.renderButton('+')}
          </div>
      </div>
      </center>
    );
  }
}
ReactDOM.render(
  <Calc />,
  document.getElementById('root')
);