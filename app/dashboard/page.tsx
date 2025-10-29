import Dashboard from "@/components/Dashboard";
import React from "react";

export const dynamic = "force-dynamic";

const page = async () => {
  // get the data from the backend
  const res = await fetch(
    `${process.env.BACKEND_ROOT_API}/api/v1/user/dashboard`
  );
  const data = await res.json();

  return <Dashboard inventory_data={data.data} />;
};

export default page;
