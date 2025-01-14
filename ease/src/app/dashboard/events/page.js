"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import apiInstance from "../../api_inst";
import { isAuthenticated } from "@/Utils/Auth";
import { redirect } from "next/navigation";
import Modal from "@/Components/Modal";
import Link from "next/link";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isModal, setIsModal] = useState(false);
  useLayoutEffect(() => {
    const isAuth = isAuthenticated;
    if (!isAuth) {
      redirect("/");
    }
  }, []);
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("_token");
      const response = await apiInstance.get("/events", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="w-5/6 m-auto bg-white rounded-lg shadow-default py-10 px-16">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Event name
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event) => (
              <tr
                key={event.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {event.name}
                </th>
                <td className="px-6 py-4">{event.location}</td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">
                <Link className="font-medium text-black-600 dark:text-black-500 hover:underline mx-2" href={`/dashboard/events/${event.id}`}>Edit</Link>
                  {/* <a
                    href={`events/${event.id}`}
                    className="font-medium text-black-600 dark:text-black-500 hover:underline mx-2"
                  >
                    Edit
                  </a> */}
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>{isModal && <Modal setModalState={setModalState} />}</div>
      </div>
    </div>
  );
}
