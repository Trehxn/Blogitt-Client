import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

import useAxios from "../hooks/useAxios";
import requireAuth from "../hoc/requireAuth";

const schema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().min(5).required(),
  })
  .required();

const Editor = () => {
  const { uid } = useSelector((state) => state?.auth?.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const { callAxios } = useAxios({ runOnMount: false });

  return (
    <>
      <div className="thin">
        <form
          onSubmit={handleSubmit(async (d) => {
            await callAxios({
              url: "/posts",
              method: "post",
              data: { userId: uid, ...d },
            });
            navigate("/posts");
          })}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, color: "#144372" }}
          >
            Editor
          </Typography>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
              margin: "1rem",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              {...register("title")}
              autoComplete="off"
              error={errors.title ? true : false}
              helperText={errors.title?.message}
            />
          </Box>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
              marginBottom: "1rem",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Content"
              multiline={true}
              minRows={3}
              variant="outlined"
              {...register("content")}
              autoComplete="off"
              error={errors.content ? true : false}
              helperText={errors.content?.message}
            />
          </Box>
          <Button type="submit" variant="contained">
            Post
          </Button>
        </form>
      </div>
    </>
  );
};

export default requireAuth(Editor);
