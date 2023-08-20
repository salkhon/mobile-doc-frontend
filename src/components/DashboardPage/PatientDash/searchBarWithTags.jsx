import React, { useState } from "react";
import { render } from "react-dom";

import "./styles.css";
import { WithContext as ReactTags } from "react-tag-input";


const SYMPTOMS= [
  "Fever",
  "Cough",
  "Shortness of breath",
  "Fatigue",
  "Headache",
  "Muscle aches",
  "Sore throat",
  "Loss of taste or smell",
  "Nausea or vomiting",
  "Diarrhea",
];

const symptomsDictionary = {
  Fever: ["Chills", "Sweating", "Headache"],
  Cough: ["Sore throat", "Shortness of breath"],
  "Shortness of breath": ["Cough", "Wheezing"],
  Fatigue: ["Weakness", "Lethargy"],
  Headache: ["Fever", "Nausea"],
  "Muscle aches": ["Joint pain", "Fever"],
  "Sore throat": ["Cough", "Swollen glands"],
  "Loss of taste or smell": ["Congestion", "Runny nose"],
  "Nausea or vomiting": ["Stomachache", "Diarrhea"],
  Diarrhea: ["Abdominal cramps", "Nausea or vomiting"],
};

const suggestions = SYMPTOMS.map((symptom) => {
  return {
    id: symptom,
    text: symptom,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const App = ({onChange}) => {
  const [tags, setTags] = React.useState([
    // { id: "Fever", text: "Fever" },
    // { id: "Cough", text: "Cough" },
  ]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
    onChange(tags.map((tag) => tag.text));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    onChange(tags.map((tag) => tag.text));
  };

  const handleDrag = (
    tag,
    currPos,
    newPos
  ) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div className="shadowPadMargin2">
      <h1> Enter Symptoms </h1>
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
        />
      </div>
    </div>
  );
};

export default App;
