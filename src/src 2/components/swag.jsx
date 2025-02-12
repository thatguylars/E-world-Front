/* TODO - add your code to create a functional React component that displays all of the available swags in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateSwagMutation } from "./app/swagsApi";
import Navigations from "./Navigations";

export default function Swags() {
  const { swags } = useSelector((state) => state.swagSlice);
  const { token } = useSelector((state) => state.userSlice);
  const [updateSwag] = useUpdateSwagMutation();
  const [filteredData, setFilteredData] = useState(swags);
  const navigate = useNavigate();

  /* Targets input values and displays swags that match input to title */
  const filterSwags = (e) => {
    setFilteredData(
      swags.filter((swag) =>
        swag.title.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };
  /* Filters Swag that are available to checkout and updates its API, only accessible when authenticated with token */
  const checkoutSwag = async (e) => {
    const availability = {
      id: e.target.name,
      token: token,
      body: { available: false },
    };
    const result = await updateSwag(availability);
    setFilteredData(
      swags.map((swag) => {
        return result.data.swag.id === swag.id
          ? { ...swag, available: result.data.swag.available }
          : swag;
      }),
    );
  };
  return (
    <div>
      <Navigations />
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search Swag"
          onChange={filterSwags}
        />
      </div>
      <div className="swags">
        {filteredData.map((itm) => {
          return (
            <div key={itm.id} className="card">
              <img
                src={itm.coverimage}
                className="card-img-top"
                alt={itm.title}
              />
              <div className="card-body">
                <h5 className="card-title">{itm.title}</h5>
                <p className="card-text">{itm.author}</p>
                <p className="card-text">ID: {itm.id}</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate(`/swag/${itm.id}`);
                }}
              >
                See Details
              </button>{" "}
              {itm.available && token && (
                <button
                  name={itm.id}
                  className="btn btn-success"
                  onClick={checkoutSwag}
                >
                  Checkout
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
