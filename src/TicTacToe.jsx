
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  useEffect(() => {
    const savedScore = JSON.parse(localStorage.getItem("score")) || {
      X: 0,
      O: 0,
    };
    console.log(JSON.stringify(savedScore));
    setScore(savedScore);
  }, []);

  useEffect(() => {
    if (calculateWinner(squares)) {
      const newScore = { ...score };
      newScore[calculateWinner(squares)]++;
      setScore(newScore);
      localStorage.setItem("score", JSON.stringify(newScore));
    }
  }, [squares]);
  const renderSquare = (i) => {
    return (
      <Button variant="light" className="square" onClick={() => handleClick(i)}>
        {squares[i]}
      </Button>
    );
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every((square) => square !== null)) {
    status = "Draw";
  } else {
    status = `Turno: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <Container className="App">
      <Row>
        <div className="status">{status}</div>
        <div>{`Pontuação: X: ${score.X} - O: ${score.O}`}</div>
        <Button
          variant="primary"
          onClick={resetGame}
          style={{ borderRadius: "16px" }}
        >
          Reset
        </Button>
      </Row>
      <Row>
        <Col>{renderSquare(0)}</Col>
        <Col>{renderSquare(1)}</Col>
        <Col>{renderSquare(2)}</Col>
      </Row>
      <Row>
        <Col>{renderSquare(3)}</Col>
        <Col>{renderSquare(4)}</Col>
        <Col>{renderSquare(5)}</Col>
      </Row>
      <Row>
        <Col>{renderSquare(6)}</Col>
        <Col>{renderSquare(7)}</Col>
        <Col>{renderSquare(8)}</Col>
      </Row>
    </Container>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
