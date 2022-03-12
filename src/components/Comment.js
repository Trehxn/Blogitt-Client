import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Comment = ({ comments }) => {
  return (
    <>
      {comments?.map((c) => {
        return (
          <div className="comment container">
            <Typography
              variant="body1"
              component="div"
              sx={{ flexGrow: 1, mb: 1 }}
            >
              {c?.comment}
            </Typography>
          </div>
        );
      })}
    </>
  );
};

export default Comment;
