// src/components/Posts.tsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {Button} from "@mui/base/Button";
import { postFilter } from "../api/apiService";

type FilterForm = {
  startDateTime: string,
  endDateTime: string,
}
const Filter: React.FC = () => {
  const [status, setStatus] = useState<String>('');
  const [filter, setFilter] = useState<FilterForm>();

  useEffect(() => {

  }, []);


  function handleClick() {
    api.get("/api/v1/filter/ok")
    .then((response) => {
      setStatus(response.data);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
  }

  const handlePost = async () => {

    const result = await postFilter({
      startDateTime: '2024-02-24 04:37:03',
      endDateTime: '2024-02-24 04:37:03'
    });
    setStatus(result);
  };

  return (
      <div>
        <h1>Posts</h1>
        <Button onClick={handlePost}>Click</Button>
        <ul>
          {status ? status : "No connection"}
        </ul>
      </div>
  );
};

export default Filter;
