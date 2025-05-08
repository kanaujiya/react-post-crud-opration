import React from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";

const PostList = (props) => {
  const { list, handleDetails, setList } = props;

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      setList(props.list.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleContent = (data) => {
    return data.length > 30 ? `${data.slice(0, 30)}...` : data;
  };

  return (
    <div>
      <Table striped bordered hover variant="dark" className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{handleContent(item.title)}</td>
                <td>{handleContent(item.body)}</td>
                <td>
                  <ButtonGroup className="gap-2">
                    <Button
                      variant="success"
                      onClick={() => handleDetails(item.id)}
                    >
                      View
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {list.length == 0 && <p className="ms-auto">Loading...</p>}
    </div>
  );
};

export default PostList;
