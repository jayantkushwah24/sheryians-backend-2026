import axios from "axios";
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit } = useForm();

  const handleForm = async ({ name, email, profile_pic }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    for (const img of profile_pic) {
      formData.append("profile_pic", img);
    }

    await axios.post("http://localhost:3000/user/create", formData);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit((data) => handleForm(data))}>
        <input
          {...register("name")}
          required
          type="text"
          placeholder="Full Name"
        />
        <input
          {...register("email")}
          required
          type="email"
          placeholder="Email"
        />
        <input
          {...register("profile_pic")}
          type="file"
          placeholder="Profile Picture"
          multiple
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
