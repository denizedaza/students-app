import React, { FC, FormEvent, FormEventHandler, useState } from "react";
import './studentTags.css'

interface StudentTagProps {
  tagList: string[];
  onTagChange: React.ChangeEventHandler<HTMLInputElement>;
  tagValue: string;
  onTagKeyCheck: React.KeyboardEventHandler;
}

const StudentTags: FC<StudentTagProps> = ({
  tagList,
  onTagChange,
  tagValue,
  onTagKeyCheck
}) => {
  return (
    <>
      {tagList &&
        tagList.map((tag, index) => {
          return <div key={index} className="tag">{tag}</div>;
        })}
        <input
          className="tag-search"
          placeholder="Add a tag"
          value={tagValue}
          onChange={onTagChange}
          onKeyDown={e => onTagKeyCheck(e)}
        />
    </>
  );
};

export default StudentTags;
