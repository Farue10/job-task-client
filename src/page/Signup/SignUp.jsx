import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";

const SignUp = () => {
  const { Signup } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setSignUpError(""); // Clear previous error messages

    // Password validation function
    const isPasswordValid = (password) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return regex.test(password);
    };

    // Check if the password is valid
    if (isPasswordValid(password)) {
      // Create user
      Signup(email, password)
        .then((result) => {
          // Update user profile
          updateProfile(result.user, {
            displayName: name,
            photoURL: image,
          });

          Swal.fire({
            title: "Success!",
            text: "User created successfully!",
            icon: "success",
          });

          setTimeout(() => {
            navigate(location?.state ? location.state : "/");
          }, 1500);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setSignUpError(errorMessage);

          // Display error message using SweetAlert2
          signUpError &&
            Swal.fire({
              title: "Error!",
              text: signUpError,
              icon: "error",
            });
        });
    } else {
      // Display password validation error using SweetAlert2
      Swal.fire({
        title: "Error!",
        text:
          "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Helmet>

        <title>SignUp</title>

      </Helmet>
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl mb-4 text-center">Register</h2>
        <p className="mb-4 text-center">
          Create your account. It’s free and only takes a minute.
        </p>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-4">
            <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none">
              Register Now
            </button>
          </div>
        </form>
        <div className="mb-4 text-center">
          <p>If already have an account?</p>
          <Link className="text-purple-800" to={"/login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;