const DetailedView = ({ name, capital, area, languages, src }) => {
  return (
    <>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h3>Languages</h3>
      <ul>{languages}</ul>
      <img src={src} alt="flag" />
    </>
  );
};

export default DetailedView;
