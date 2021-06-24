function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li className="list-item" key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul className="list">{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('app')
);