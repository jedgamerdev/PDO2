import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState({
    title: workout.title,
    load: workout.load,
    reps: workout.reps,
  });

  const handleClickDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedWorkout({
        title: workout.title,
        load: workout.load,
        reps: workout.reps,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedWorkout({ ...editedWorkout, [name]: value });
  };

  const handleUpdate = async (e) => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "PATCH", // Or "PUT"
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(editedWorkout),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      setIsEditing(false);
    } else {
      console.log("update failed");
    }
  };

  return (
    <div className="workout-details">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            value={editedWorkout.title}
            onChange={handleInputChange}
            placeholder="Exercise"
          />
          <input
            type="number"
            name="load"
            value={editedWorkout.load}
            onChange={handleInputChange}
            placeholder="Load"
          />
          <input
            type="number"
            name="reps"
            value={editedWorkout.reps}
            onChange={handleInputChange}
            placeholder="Reps"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={handleEditToggle}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p>
            <strong>Load: </strong>
            {workout.load}
          </p>
          <p>
            <strong>Reps: </strong>
            {workout.reps}
          </p>
          <p>
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>

          <span
            className="material-symbols-outlined"
            onClick={handleClickDelete}
          >
            delete
          </span>
          <span
            id="edit"
            className="material-symbols-outlined"
            onClick={handleEditToggle}
          >
            edit
          </span>
        </>
      )}
    </div>
  );
};

export default WorkoutDetails;
