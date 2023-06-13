import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_BIRTH } from "../helpers/queries";

const Authors = ({authors}) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editBorn] = useMutation(EDIT_BIRTH,{
    refetchQueries:[{query:ALL_AUTHORS}]
  })

const submit = (e)=> {
  e.preventDefault()

    editBorn ({variables: {name, born}})
  setBorn('')
  
}

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookcount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set BirthYear</h2>
      <form onSubmit={submit}>
            <div>
              name: <select onChange={(e)=>setName(e.target.value)}>
                {authors.map(a => (
                  <option key={a.name} value={a.name}>{a.name}</option>
                ))}
</select>
            </div>
            <div>
              born: <input type="Number" value={born} onChange={({target})=>setBorn(parseInt(target.value))} />
            </div>
            <button type="submit">edit born</button>
      </form>
    </div>
  )
}

export default Authors
