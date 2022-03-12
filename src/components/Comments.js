import useAxios from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

import Comment from "../components/Comment";
import { useSelector } from "react-redux";

const Comments = ({ postId }) => {
  const uid = useSelector((state) => (state.auth ? state.auth.user.uid : null));
  const { data: comments, callAxios } = useAxios({
    modifyData: (existingData, newData) => {
      return [
        ...existingData,
        ...(Array.isArray(newData) ? [...newData] : [newData]),
      ];
    },
    url: `/comments/${postId}`,
  });

  const { register, handleSubmit } = useForm();

  return (
    <>
      {uid ? (
        <form
          onSubmit={handleSubmit((data) => {
            callAxios({
              url: `/comments/${postId}`,
              method: "post",
              data: { userId: uid, postId: postId, ...data },
            });
          })}
        >
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
            noValidate
          >
            <TextField
              type="search"
              {...register("comment")}
              autoComplete="off"
              label="Enter Comment"
              variant="standard"
            />
          </Box>
        </form>
      ) : (
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            flexGrow: 1,
            margin: "1rem",
          }}
        >
          Login to add new comments
        </Typography>
      )}

      <Comment comments={comments} />
    </>
  );
};

export default Comments;
