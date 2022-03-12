import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const requireAuth = (Component) => {
  const ComposedComponent = ({ ...rest }) => {
    const auth = useSelector((state) => {
      return state.auth;
    });
    const navigate = useNavigate();

    useEffect(() => {
      if (!auth.isFetched) return null;
      if (!auth.user.uid) navigate("/login");
    }, [auth, navigate]);

    if (auth.isFetched && auth.user.uid) {
      return <Component {...rest} />;
    } else {
      return null;
    }
  };

  return ComposedComponent;
};

export default requireAuth;
