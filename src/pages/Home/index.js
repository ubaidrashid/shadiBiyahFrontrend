import { useEffect, useState } from "react";

import {ControlledCarousel} from "../../Components/Carousels/HomeCarousel";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
     <ControlledCarousel user={user}/>
    </>
  );
}

export default Home;