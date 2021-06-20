// import react from the installed react packages

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// This is a function component for square component. This component does not store state so function component seems to do quite well here.

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


// This class represents a board component. A collection of square compoents in a 3x3 grid.

class Board extends React.Component {
  
  renderSquare(i) {

    // this function is to persist state between each input.
    return (<Square value={this.props.squares[i]} onClick={()=> this.props.onClick(i)} />);
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// This class represents the component of the whole game. This manipulates the board and square components and stores history for bouncing back/forth between moves.
// This state is stored in a private state object in which a history object stores the matrix of board. Each move is stored in this array and updated/rendered as state is changed.

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {

    // This function is for manipulating input to a button (Square) as input is given. The state is updated by this method.

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {

    // This function is used to move back and forth between the play. It uses the stepNumber variable to change state and then the render function uses that to reflect state at that step.

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; // Restoring state
    const winner = calculateWinner(current.squares); // Winner if game over.

    // buttons for moving between states. output as list elements in the tic-tac-toe window.

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to Move #' + move :
        'Go to Game Start';
      return(
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: '+ winner;
    }
    else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O'); // switching players between X and O.
    }

    // render board with squares reflecting the current state of the game using the history state object.
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>  
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

/* This is a javascript function with logic on checking the appropriate positions and returning if game is over and winner if any. It checks certain combination of matrix positions
   to determine winner */

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  
  for (var i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// The React DOM render to render it in frontend.
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

