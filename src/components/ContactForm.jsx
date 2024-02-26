import React, { useState, useContext, createContext } from "react";

function ContactForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const TodoContext = createContext({
    addContact: (todo) => {},
  });

  const useTodo = () => {
    return useContext(TodoContext);
  };
  const { addContact } = useTodo();

  const add = (e) => {
    console.log("add", userName, email, message);

    e.preventDefault();

    if (!userName) return;

    addContact({ userName, email, message });
    setUserName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={add}>
      <div className="space-y-12">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
          <div className="col-span-4">
            <div className="flex rounded-0 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-300">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="block h-12 flex-1 border-0 bg-transparent py-1.5 pl-6 text-gray-700 placeholder:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex rounded-0 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-300">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block h-12 flex-1 border-0 bg-transparent py-1.5 pl-6 text-gray-700 placeholder:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="about"
                name="about"
                rows="3"
                className="block w-full rounded-0 border-0 py-1.5 pl-6 pt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="col-span-4">
            <button
              type="submit"
              className="rounded-0 h-12 w-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black border-2 border-black"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;
