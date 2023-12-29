"use client";
import { addPrize } from "../../lib/actions";
import React, { useRef } from "react";

export default function AddPrizeForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async (event: React.FormEvent) => {
    if (formRef.current) {
      const data = new FormData(formRef.current);
      try {
        await addPrize(data);
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
        if (formRef.current) formRef.current.reset();
      }
    }
  };

  return (
    <div className="pt-20 max-w-sm m-auto">
      <form
        className="flex flex-col gap-4 w-full p-4 mt-5 bg-base-100 rounded-lg shadow-lg border-2 border-gray-950"
        onSubmit={onSubmit}
        ref={formRef}
      >
        <div className="flex flex-col">
          <label className="text-left">
            Prize Name
            <input
              name="prizeName"
              className="border-2 border-gray-300 m-4 p-2 rounded-lg"
            />
          </label>
          <label className="text-left">
            Pont Value
            <input
              name="pointValue"
              className="border-2 border-gray-300 m-4 ml-6 p-2 rounded-lg "
            />
          </label>
        </div>
        <button type="submit" className="btn btn-outline w-44 m-auto">
          Submit
        </button>
      </form>
    </div>
  );
}
