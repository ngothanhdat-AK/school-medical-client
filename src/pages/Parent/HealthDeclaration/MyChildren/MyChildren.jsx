import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axiosInstance from "../../../../api/axios";

import {useDispatch} from "react-redux";
import {setListStudentParent} from "../../../../redux/feature/listStudentParent";

const MyChildren = () => {
  const dispatch = useDispatch();
  const parentId = useSelector((state) => state.user?.userId);
  const [data, setData] = useState([]);
  console.log("Parent ID:", parentId);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/parents/${parentId}/students`
        );
        setData(response.data);
        dispatch(setListStudentParent(response.data));
      } catch (error) {
        console.error("Error fetching children data:", error);
        setData([]);
      }
    };
    fetchApi();
  }, [parentId, dispatch]);
  console.log(data);

  return (
    <div>
      <h1>My Children</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.fullName}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyChildren;
