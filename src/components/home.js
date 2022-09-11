import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
let navigate = useNavigate();

useEffect(() => navigate('/posts'));

return <div></div>
}

export default Home;