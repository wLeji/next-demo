export function Props({ name, age }: { name: string; age: number }) {
  return (
    <div>
      <h3>Props</h3>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
