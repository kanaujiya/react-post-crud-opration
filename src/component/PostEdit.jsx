import React, { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Container,
  Form,
} from "react-bootstrap";

const PostEdit = (props) => {
  const { id, userId, title, body } = props?.postDetails;
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [status, setStatus] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            title: editTitle,
            body: editBody,
            id: id,
            userId: userId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedPost = await response.json();
      setStatus(true);
      props?.setPostDetails(updatedPost);
    } catch (error) {
      console.error(`Error updating post: ${error.message}`);
    } finally {
      setStatus(false);
      props?.setEditStatus(false);
    }
  };

  return (
    <Container>
      <Card className="m-5">
        <Form className="m-5" onSubmit={(e) => handleSubmit(e)}>
          {status && (
            <Alert variant="success">Post Comment updated successfully!</Alert>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              name="title"
              placeholder="Enter Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Post Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter Post Description..."
              value={editBody}
              name="body"
              onChange={(e) => setEditBody(e.target.value)}
            />
          </Form.Group>

          <ButtonGroup className="gap-2">
            <Button variant="success" type="submit">
              Save
            </Button>
            <Button
              variant="primary"
              type="reset"
              onClick={() => props?.setEditStatus(false)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      </Card>
    </Container>
  );
};

export default PostEdit;
