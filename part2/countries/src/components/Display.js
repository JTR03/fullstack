import DetailedView from "./Detailed";

const Display = ({ country, filt,onClick,show }) => {
  const filtered = country.filter((country) =>
    country.name.common.toLowerCase().includes(filt)
  );

  if (filtered.length > 10) {
    return <p>Too many matches, be more specific</p>;
  }
  if (filtered.length === 1) {
    return (
      <>
        {filtered.map((state) => (
          <DetailedView
          key={state.cca2}
            name={state.name.common}
            capital={state.capital}
            area={state.area}
            languages={Object.values(state.languages).map((lang, ind) => (
              <li key={ind}>{lang}</li>
            ))}
            src={state.flags["png"]}
          />
        ))}
      </>
    );
  }
  return (
    <ul>
      {filtered.map((name) => (
        <li key={name.cca2}>
          {name.name.common}
          
          {/* <button>show</button> */}
        </li>
      ))}
    </ul>
  );
};

export default Display;
