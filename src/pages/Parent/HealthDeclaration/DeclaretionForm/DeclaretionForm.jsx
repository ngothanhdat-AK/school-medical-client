import React from "react";
import {useSelector} from "react-redux";

const DeclaretionForm = () => {
  const listStudentParent = useSelector(
    (state) => state.listStudentParent.listStudentParent
  );

  console.log(listStudentParent);

  return <div>DeclaretionForm</div>;
};

export default DeclaretionForm;
