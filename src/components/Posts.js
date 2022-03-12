import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useAxios from "../hooks/useAxios";

const Posts = () => {
  const { data, loading } = useAxios({ url: "/posts" });
  const navigate = useNavigate();

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
        Posts
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {data?.map((d) => {
            return (
              <div
                key={d._id}
                className="container post hover"
                onClick={() => {
                  navigate(`/posts/${d._id}`);
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    textTransform: "uppercase",
                    mb: 1,
                  }}
                >
                  {d.title}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ flexGrow: 1, mb: 1 }}
                >
                  {d.content}
                </Typography>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Posts;
