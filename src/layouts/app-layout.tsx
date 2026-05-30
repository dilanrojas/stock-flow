import Sidebar from "../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}
