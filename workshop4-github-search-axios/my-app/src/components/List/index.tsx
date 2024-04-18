import User from "../../types/user";
import { useEffect, useState } from "react";
import SearchResponse from "../../types/search-respponse";
import PubSub from "pubsub-js";

import "./index.css";

export default function List() {
  const [searchResponse, setSearchResponse] = useState<SearchResponse>({
    isFirst: true,
    isLoading: false,
    isError: false,
    users: [],
  });
  // const { seachResponse:{isFirst, isLoading, isError, users} } = props;
  const { isFirst, isLoading, isError, users } = searchResponse;

  useEffect(() => {
    const token = PubSub.subscribe("sd545", (msg, data) => {
      setSearchResponse(data);
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);
  return (
    <div>
      {isFirst ? (
        <h2>Please Enter Keyword to start</h2>
      ) : isLoading ? (
        <h2>Please Wait</h2>
      ) : isError ? (
        <h2>Whoops! Try later</h2>
      ) : (
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
      )}
    </div>
  );
}
