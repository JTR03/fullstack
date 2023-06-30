import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../helpers/queries'

const Recommendated = ({favorite}) => {
  const result = useQuery(ALL_BOOKS,{
    variables:{genre:favorite}
  })

  if(result.loading){
    return(
      <div>
        Loading...
      </div>
    )
  }
  if(result.data){
     return (
       <div>
         <h5>Based on your favorite genre {favorite}</h5>
         <table>
           <tbody>
             <tr>
               <th></th>
               <th>author</th>
               <th>published</th>
             </tr>
             {result.data.allBooks.map((f) => (
               <tr key={f.id}>
                 <td>{f.title}</td>
                 <td>{f.author}</td>
                 <td>{f.published}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     );
  }
 
}

export default Recommendated
