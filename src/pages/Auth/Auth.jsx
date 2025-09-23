import Style from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { useState, useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Types } from "../../Utility/action.type";
import {
  // getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
// import {db} from "../../Utility/firebase"
import { useLocation } from "react-router-dom";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const navigate = useNavigate();
  const navStateData = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Types.SET_USER,
            user: userInfo.user,
          });

          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Types.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={Style.auth}>
      {/* logo containeir */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/250px-Amazon_2024.svg.png"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={Style.auth_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              fontWeight: "bold",
              color: "red",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={Style.signin_button}
            type="submit"
            onClick={authHandler}
            name="signin"
          >
            {loading.signIn ? (
              <>
                <ClipLoader color="#000" size={20} />
                <span
                  style={{
                    color: "gray",
                    fontSize: "16px",
                    padding: "5px",
                  }}
                >
                  Sign In...
                </span>
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>
        {/* agreement */}
        <p className={Style.notice}>
          By signing in you agree to Amazon's{" "}
          <a href="#">Conditions of Use & Sale</a>. Please see our{" "}
          <a href="#">Privacy Notice</a>, <a href="#">Cookies Notice</a> and{" "}
          <a href="#">Interest-Based Ads Notice</a>.
        </p>

       
        <button
          onClick={authHandler}
          type="submit"
          name="signup"
          className={Style.signup_button}
        >
          {loading.signUp ? (
            <>
              <ClipLoader color="#000" size={20} />
              <span
                style={{
                  color: "gray",
                  fontSize: "15px",
                  padding: "5px",
                    fontWeight: '600'
                }}
              >
               Creating Account...
              </span>
            </>
          ) : (
            " Create your Amazone Account"
          )}
        </button>

    

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
