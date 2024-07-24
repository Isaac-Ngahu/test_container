import "./App.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Swal from "sweetalert2";

function App() {
  const [toggle, setToggle] = useState(new Date());
  const [shifts, setShifts] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    ward: "",
  });
  const bookings = [
    {
      date: "2024-03-15",
      startTime: "09:00",
      endTime: "12:00",
      employeeName: "John Doe",
    },
    {
      date: "2024-03-16",
      startTime: "10:00",
      endTime: "13:00",
      employeeName: "Jane Smith",
    },
    {
      date: "2024-03-17",
      startTime: "08:00",
      endTime: "12:00",
      employeeName: "Shikuku",
    },
    {
      date: "2024-03-15",
      startTime: "13:00",
      endTime: "16:00",
      employeeName: "Njugio",
    },
    {
      date: "2024-03-16",
      startTime: "14:00",
      endTime: "18:00",
      employeeName: "Steph",
    },
    {
      date: "2024-03-17",
      startTime: "13:00",
      endTime: "15:00",
      employeeName: "Isaac",
    },
    {
      date: "2024-03-15",
      startTime: "17:00",
      endTime: "20:00",
      employeeName: "Kamau",
    },
    {
      date: "2024-03-16",
      startTime: "17:00",
      endTime: "21:00",
      employeeName: "Alex",
    },
    {
      date: "2024-03-17",
      startTime: "18:00",
      endTime: "20:00",
      employeeName: "Omondi",
    },
  ];
  function handleBooking(e) {
    e.preventDefault();
    setFormData({
      startTime: "",
      endTime: "",
      ward: "",
    });
    Swal.fire({
      icon: "success",
      title: "Booked",
      text: "Booking created successfully",
      timer: 5000,
    });
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleDayClick(date) {
    const inputDate = new Date(date);

    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = inputDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    const matchingObjects = bookings.filter(
      (booking) => booking.date === formattedDate
    );
    console.log(matchingObjects);
    console.log(inputDate);
    setShifts(matchingObjects);
  }
  return (
    <div className="App">
      <Calendar
        onClickDay={handleDayClick}
        onChange={setToggle}
        value={toggle}
      />
      {shifts.length > 0 ? (
        <>
          <table>
            <tr>
              <th>hours booked</th>
              <th>employee name</th>
            </tr>
            {shifts.map((shift, index) => {
              return (
                <tr key={index}>
                  <td>{`${shift.startTime} - ${shift.endTime}`}</td>
                  <td>{shift.employeeName}</td>
                </tr>
              );
            })}
          </table>
          <button onClick={() => setIsBooking(!isBooking)}>book hours</button>
        </>
      ) : (
        <div className="nobookings">
          <p>no bookings have been made on this day </p>
          <button onClick={() => setIsBooking(!isBooking)}>book hours</button>
        </div>
      )}
      {isBooking && (
        <form className="booking-form" onSubmit={handleBooking}>
          <h1>book your hours here</h1>
          <label htmlFor="start-time">Start Time:</label>
          <input
            type="time"
            id="start-time"
            name="startTime"
            onChange={handleChange}
            value={formData.startTime}
          ></input>
          <label htmlFor="end-time">End Time:</label>
          <input
            type="time"
            id="end-time"
            name="endTime"
            onChange={handleChange}
            value={formData.endTime}
          ></input>
          <label htmlFor="end-time">Enter Ward Name</label>
          <input
            type="text"
            id="ward-name"
            name="ward"
            onChange={handleChange}
            value={formData.ward}
          ></input>
          <button type="submit">book</button>
        </form>
      )}
    </div>
  );
}

export default App;
