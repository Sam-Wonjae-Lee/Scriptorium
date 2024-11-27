
import { useEffect } from "react";
import { useRouter } from "next/router";
import { verifyLogin, refreshLogin } from "@/components/refresh";

const Home = () => {

  const router = useRouter();
  
  useEffect(() => {
    const waitLogin = async () => {
      if (!(await verifyLogin())) {
        await refreshLogin();
      }
      if (!(await verifyLogin())) {
        router.push("\welcome")
      }
      else {
        router.push("\home")
      }
    }

    waitLogin();
  }, [])

  return (
    <main>
    </main>
  );
};

export default Home;
