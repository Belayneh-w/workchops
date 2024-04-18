import { useState } from "react";
import List from "./components/List";
import Search from "./components/Search";
import User from "./types/user";
import SearchResponse from "./types/search-respponse";

export default function App() {

    const [searchResponse, setSearchResponse] = useState<SearchResponse>({
      isFirst: true,
      isLoading: false,
      isError: false,
      users: [],
    });
    return (
      <div className="container">
        <Search onSetSearchResponse={setSearchResponse} />
        {/* <List seachResponse ={searchResponse}/> */}
        <List {...searchResponse} />
      </div>
    );
}
