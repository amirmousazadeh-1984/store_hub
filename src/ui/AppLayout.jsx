import { Outlet } from "react-router-dom";
import PageNav from "./PageNav";
import styles from "./AppLayout.module.css";
import { AuthCheck } from "../App";
import Footer from "../ui/Footer";

function AppLayout() {
  return (
    <>
      <PageNav />
      <AuthCheck />
      <main className={styles.applayout}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
