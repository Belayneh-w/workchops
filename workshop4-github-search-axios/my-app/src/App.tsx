import { useState } from "react";
import List from "./components/List";
import Search from "./components/Search";


import SearchResponse from "./types/search-respponse";

export default function App() {

    return (
      <div className="container">
        <Search />
        {/* <List seachResponse ={searchResponse}/> */}
        <List  />
      </div>
    );
}
