import api from "@/services/api";
import { useState, useEffect } from "react";

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState();

    useEffect(() => {
        const getAllUsers = async () => {
        const token = localStorage.getItem("token");
        const data = await api.get("/get-users", {
            headers: { Authorization: "Bearer " + token },
        });
        setAllUsers(data.data[0].access);
        console.log(data.data[0].access)
        };

        getAllUsers();
    }, []);

  return (
    <div className="">
      <h1>{allUsers}</h1>
    </div>
  );
};

export default AllUsers;
