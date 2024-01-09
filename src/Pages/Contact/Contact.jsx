import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const Contact = () => {
  const [formData, setFormData] = useState({
    message: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset the form after submission
    setFormData({
      message: '',
      email: '',
    });

    // Show success toast
    toast.success('Form submitted successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="contact-2">
      <div className="background">
        <div className="container px-4 mx-auto">
          <div className="text-center md:max-w-2xl md:mx-auto px-2 md:pb-4">
            <strong className="text-gray-500 uppercase">Get Started</strong>
            <h1 className="text-3xl text-black md:text-4xl font-medium my-2">Get in Touch with Us</h1>
            <div className="contact-form mt-6 md:mt-12">
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-black">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    cols="30"
                    rows="5"
                    placeholder="Send us your queries or feedback"
                    className="border-2 text-black border-solid rounded py-2 px-3 placeholder-gray-500 placeholder-opacity-100 w-full focus:border-indigo-300 input transition-colors"
                  ></textarea>
                </div>
                <div className="mb-4 flex">
                  <div className="flex-grow">
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your E-mail"
                      className="border-2 text-black border-solid rounded py-2 px-3 placeholder-gray-500 placeholder-opacity-100 w-full focus:border-indigo-300 input"
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-black bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-solid border-indigo-600 rounded py-2 px-4 flex-shrink-0 ml-4 transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={faTelegramPlane} />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="md:px-4 md:w-1/3 mt-8 md:mt-0 mx-auto text-center">
            <address>
              <div className=" text-black font-bold mb-2">Ajitgarh, Punjab</div>
              <span className='text-black'>
                Plot No. C-184<br />
                Phase­ VIII­A, Punjab 160071
              </span>
            </address>
          </div>

      <Link className='text-gray-500' to = "/">Go Back</Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
