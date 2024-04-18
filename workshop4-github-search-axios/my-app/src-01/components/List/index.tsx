import User from "../../types/user";
import SearchResponse from "../../types/search-respponse";

import "./index.css";

// type Props = {
//   seachResponse: SearchResponse;
// };

export default function List(props: SearchResponse) {
  // const { seachResponse:{isFirst, isLoading, isError, users} } = props;
const {isFirst, isLoading, isError, users} = props
  return (
   <div>
    {
      isFirst?<h2>Please Enter Keyword to start</h2>:
      isLoading?<h2>Please Wait</h2>:
      isError?<h2>Whoops! Try later</h2>:
       <div className="row">
      {users.map((user) => (
        <div className="card" key={user.id}>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            <img
              src={user.avatar_url}
              alt="GitHub Avatar"
              style={{ width: "100px" }}
            />
          </a>
          <p className="card-text">{user.login}</p>
        </div>
      ))}
    </div>
    }
   </div>
  );
}
