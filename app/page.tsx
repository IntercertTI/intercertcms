import {redirect} from "next/navigation";


export default function Home() {

  // redirect to login page if not logged in else redirect to dashboard
  // TODO: add authentication logic
  redirect("/login");
}
