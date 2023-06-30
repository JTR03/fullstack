import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../helpers/queries";
import { useState } from "react";

const Books = () => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (result.loading) {
    return <h3>loading...</h3>;
  }
  if (result.data) {
    const data = result.data.allBooks;

    return (
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {data.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          {Array.from(new Set([].concat(...data.map((g) => g.genres)))).map(
            (b) => (
              <button
                key={b}
                onClick={() => {
                  setGenre(b);
                }}
              >
                {b}
              </button>
            )
          )}
          <button onClick={()=>setGenre(null)}>All Book</button>
        </div>
      </div>
    );
  }
};

export default Books;
