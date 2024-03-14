import React from 'react';
import { AlertSVG } from "../assets/index";

const DeletePopup = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

  return (
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div class="bg-white rounded-lg p-8 m-4   text-center w-96">
        <div class="flex justify-end mb-4">
          <button class="text-black-500 hover:text-gray-500"  onClick={onCancel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-black-500 text-3xl"
           
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          </button>
        </div>
        <div className="flex justify-center items-center"> <img src={AlertSVG} className="w-10 h-10 " /></div>
       
        <h1 className="text-lg font-semibold mb-2">ARE YOU SURE?</h1>
        <p className="text-sm mb-6">
          You will not be able to undo this action if you proceed!
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200">
            Cancel
          </button>
          <button onClick={onConfirm} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePopup