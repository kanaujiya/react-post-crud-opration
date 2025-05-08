import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import PostList from "./PostList";
import PostEdit from "./PostEdit";
import PostDetails from "./PostDetails";

const HomePage = () => {
  const [list, setList] = useState([]);
  const [postDetails, setPostDetails] = useState({});
  const [editStatus, setEditStatus] = useState(false);

  

  const handleListPost = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let result = await response.json();
      setList(result);
    } catch (error) {
      console.error("There was a problem with the fetch operation", error);
    }
  };

  const handleDetails = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let result = await response.json();
      setPostDetails(result);
    } catch (error) {
      console.error("There was a problem with the fetch operation", error);
    }
  };

  const handleEdit = async (id) => {
    setEditStatus(true);
  };

  useEffect(() => {
    handleListPost();
    handleDetails(1);
  }, []);
  return (
    <Row className="m-auto">
      <Col>
        {!editStatus ? (
          <PostDetails postDetails={postDetails} handleEdit={handleEdit} />
        ) : (
          <PostEdit
            postDetails={postDetails}
            setPostDetails={setPostDetails}
            setEditStatus={setEditStatus}
          />
        )}
      </Col>
      <Col>
        <PostList
          list={list}
          setList={setList}
          handleDetails={handleDetails}
          handleEdit={handleEdit}
        />
      </Col>
    </Row>
  );
};

export default HomePage;
