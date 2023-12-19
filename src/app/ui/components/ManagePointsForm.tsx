"use client";
import React, { useRef } from "react";

// Assuming these are the imports from your .actions file
import { UpdatePoints, updatePointsAddOnePoint } from "../../lib/actions";

export default function ManagePointsForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function addOnePoint() {
    await updatePointsAddOnePoint();
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const data = new FormData(formRef.current);
      try {
        await UpdatePoints(data);
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
        if (formRef.current) formRef.current.reset();
      }
    }
  };

  return (
    <div className="flex max-w-lg m-auto content-center">
      <form
        ref={formRef}
        className="flex flex-col gap-4 w-full p-4 mt-10 bg-base-100 rounded-lg shadow-lg border-2 border-gray-950"
        onSubmit={onSubmit}
      >
        <label className="text-left">
          Points Earned:
          <input
            name="pointsEarned"
            className="border-2 border-gray-300 m-4 p-2 rounded-lg w-20"
            type="number"
          />
        </label>
        <label className="text-left">
          Points Lost:
          <input
            name="pointsLost"
            className="border-2 border-gray-300 m-4 p-2 rounded-lg ml-8 w-20"
            type="number"
          />
        </label>
        <button className="btn btn-outline w-44 m-auto" type="submit">
          Update Points
        </button>
        <button
          className="btn btn-outline w-44 m-auto"
          type="button"
          onClick={addOnePoint}
        >
          Add One Point
        </button>
      </form>
    </div>
  );
}
