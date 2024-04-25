import React, { useState } from "react";
import validateGroups from './Validation'; 

const TodoListApp = () => {
  const [groups, setGroups] = useState([{ from: 1, to: 10 }]);
  const [data, setData] = useState([[]]); 
  const [errorMessage, setErrorMessage] = useState("");

const addGroup = () => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup.to === 10) {
        setErrorMessage("The entire range is covered, cannot add more groups");
        return;
    }
    const from = lastGroup.to + 1;
    const to = 10;

    const newGroups = [...groups, { from, to }];
    const newDatas = [...data, []]; 

    const errors = validateGroups(newGroups);
    if (errors.length === 0) {
        setGroups(newGroups);
        setData(newDatas);
        setErrorMessage("");
    } else {
        setErrorMessage(errors.join(", "));
    }
};

  const deleteGroup = (index) => {
    const newGroups = [...groups];
    const newData = [...data];
    newGroups.splice(index, 1);
    newData.splice(index, 1);
    setGroups(newGroups);
    setData(newData);
  };

  const handleInputChange = (index, field) => (event) => {
    const newValue = parseInt(event.target.value, 10);


    if (isNaN(newValue) || newValue < 1 || newValue > 10) {
        return;
    }

    setGroups(currentGroups => {
        const newGroups = currentGroups.map((group, idx) => {
            if (idx === index) {
                return { ...group, [field]: newValue };
            }
            return group;
        });

     
        return newGroups;
    });
};

const showStatus = () => {
    const errors = validateGroups(groups);
    if (errors.length > 0) {
        setErrorMessage(errors.join(", "));
        return;
    }
    const promises = groups.map((group) => {
        const tasks = Array.from({ length: group.to - group.from + 1 }, (_, i) => i + group.from);
        return Promise.all(tasks.map((task) => fetch(`https://jsonplaceholder.typicode.com/todos/${task}`)
            .then(res => res.json())
            .catch(() => ({ completed: false }))
        ));
    });

    Promise.all(promises).then((results) => {
        const newData = results.map(groupResults => groupResults.map(todo => todo.completed));
        setData(newData);
    }).catch(() => {
        setErrorMessage("Failed to fetch some group statuses");
    });
};

  return (
    <div className="myContainer">
      <h1 className="heading">To-Do List </h1>
      <div className="error-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

      <ul className="inputcenter" style={{ listStyleType: "none" }}>
    {groups.map((group, index) => (
        <li key={index}>
            <span className="todoGroup">Group {index + 1}: </span>
            <input
                type="number"
                value={group.from}
                onChange={handleInputChange(index, "from")}
            />
            <span>-</span>
            <input
                type="number"
                value={group.to}
                onChange={handleInputChange(index, "to")}
            />
            <button className="delete" onClick={() => deleteGroup(index)}>Delete</button>
        </li>
    ))}
</ul>
<div className="button-container">
      <button className="addgroup" onClick={addGroup}>Add Group</button>
      <button className="showstatus" onClick={showStatus}>Show Status</button>
      </div>
      {data.length > 0 && (
    <ul className="listGroup" style={{ listStyleType: "none" }}>
        {groups.map((group, index) => (
            <li key={index}>
                <span className="myGroup">Group {index + 1}: </span>
                {data[index].map((completed, i) => (
                    <span key={i}>({group.from + i}) {completed ? "True, " : "False, "}</span>
                ))}
            </li>
        ))}
    </ul>
)}
    </div>
  );
};

export default TodoListApp;
