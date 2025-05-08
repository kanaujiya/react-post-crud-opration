import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import CreatPost from "./CreatPost";

const PostDetails = (props) => {
  const { id, title, body } = props?.postDetails;
  const [show, setShow] = useState(false);

  return (
    <Container>
      <Button
        className="m-5 mb-1 mt-3 text-white text-uppercase border-0"
        style={{ backgroundColor: "crimson" }}
        size="lg"
        onClick={() => setShow(true)}
      >
        Create Post
      </Button>
      <Card className="m-5 mt-3">
        <Card.Body>
          <Card.Title>Post Details</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
          <Card.Text>{body}</Card.Text>
          <Button onClick={() => props?.handleEdit(id)}>Edit Comment</Button>
        </Card.Body>
      </Card>

      <CreatPost show={show} setShow={setShow} />
    </Container>
  );
};

export default PostDetails;
