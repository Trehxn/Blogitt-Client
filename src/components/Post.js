import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import useAxios from "../hooks/useAxios";
import Comments from "./Comments";

const Post = () => {
  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();
  const { postId } = useParams();

  const { data, callAxios } = useAxios({
    url: `posts/${postId}`,
  });

  const handleClick = async () => {
    await callAxios({
      url: `/posts/${postId}`,
      method: "delete",
    });
    navigate("/posts");
  };
  return (
    <div className="posts">
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1,
          margin: "1rem auto",
        }}
      >
        Post
      </Typography>
      <div className="post container">
        {user?.uid === data?.userId ? (
          <Button
            variant="contained"
            color="error"
            sx={{ float: "right" }}
            onClick={() => {
              handleClick();
            }}
          >
            Delete
          </Button>
        ) : null}
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          {data?.title}
        </Typography>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1, mb: 1 }}>
          {data?.content}
        </Typography>
      </div>
      <Comments postId={postId} />
    </div>
  );
};

export default Post;
