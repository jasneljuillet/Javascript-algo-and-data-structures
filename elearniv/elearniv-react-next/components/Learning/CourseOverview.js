import React from "react";

const CourseOverview = ({ overview }) => {
  return (
    <div className="courses-details-desc-style-two">
      <h3>À propos de ce cours</h3>
      <div dangerouslySetInnerHTML={{ __html: overview }}></div>
    </div>
  );
};

export default CourseOverview;
