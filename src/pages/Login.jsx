import  {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);
            const response = await fetch("https://recipe-backend-30j8.onrender.com/auth/login",
             {
                method: "POST",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                },body: formData,});
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Login failed"
        )
      }

      localStorage.setItem("token", data.access_token);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } 
    finally { setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2">
            Login to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">
              Email</label>
            <input
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-xl"
              placeholder="Enter email" required/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>

            <input
              type="password" value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 rounded-xl"
              placeholder="Enter password" required/>
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-2 text-orange-500 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

        