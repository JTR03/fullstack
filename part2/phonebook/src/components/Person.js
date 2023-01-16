export const Person = ({ person, filter}) => {
  return (
    <ul>
      {person
        .filter((name) => name.name.includes(filter))
        .map((name) => (
          <li key={name.name}>
            {name.name} {name.number}
          </li>
        ))}
    </ul>

    //   )}
  );
};
