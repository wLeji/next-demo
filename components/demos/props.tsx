interface Props {
  name: string;
  age: number;
}

export const PropsComponent: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <h3>Props</h3>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
};
