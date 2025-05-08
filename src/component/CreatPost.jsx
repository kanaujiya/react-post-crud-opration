import React, { useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";

const CreatPost = (props) => {
  const { show, setShow } = props;
  const [comment, setComment] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: 1,
            title: newTitle,
            body: comment,
          }),
        }
      );
      if (response.ok) {
        setShow(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto">Create Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter comment..."
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <ButtonGroup className="gap-4">
            <Button
              variant="secondary"
              style={{ borderRadius: "0px" }}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="success"
              style={{ borderRadius: "0px" }}
              type="submit"
            >
              Save Changes
            </Button>
          </ButtonGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatPost;
