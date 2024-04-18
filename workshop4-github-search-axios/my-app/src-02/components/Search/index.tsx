import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";

import SearchResponse from "../../types/search-respponse";

type Props = {
  onSetSearchResponse: (value: SearchResponse) => void;
};

export default function Search(props: Props) {
  const { onSetSearchResponse } = props;

  const inputRef = useRef<HTMLInputElement>(null)
  // const [keyword, setKeyword] = useState("");

  const search = async () => {
    onSetSearchResponse({
      isFirst: false,
      isLoading: true,
      isError: false,
      users: [],
    });
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${inputRef.current!.value}`
      );

      if (response.status === 200) {
        onSetSearchResponse({
          isFirst: false,
          isLoading: false,
          isError: false,
          users: response.data.items,
        });
      } else {
        onSetSearchResponse({
          isFirst: false,
          isLoading: false,
          isError: true,
          users: [],
        });
      }
    } catch (e) {
      onSetSearchResponse({
        isFirst: false,
        isLoading: false,
        isError: true,
        users: [],
      });
    }
  };

  return (
    <section className="jumbotron">
      <h3 className="jumbotron-heading">Search Github Users</h3>
      <div>
        <input
          type="text"
          placeholder="enter the name you search"
        ref = {inputRef}
        />
        &nbsp;
        <button onClick={search}>Search</button>
      </div>
    </section>
  );
}
