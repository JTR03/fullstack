export const Person = ({ person, filter,remove }) => {
  return (
    <ul>
      {person
        .filter((name) => name.name.includes(filter))
        .map((name) => (
          <li key={name.id}>
            {name.name} {name.number} 
            <button onClick={()=>remove(name.id)}>delete</button>
          </li>
        ))}
    </ul>

    //   )}
  );
};
