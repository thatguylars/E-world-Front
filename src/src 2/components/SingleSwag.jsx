/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleSwagQuery } from "./app/swagsApi";
import Navigations from "./Navigations";

export default function SingleSwag() {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleSwagQuery(params.id);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Navigations />
          <div className="singleSwag">
            <div className="singleSwagContents">
              <div>
                <img
                  className="singleImg"
                  src={data.swag.coverimage}
                  alt={data.swag.title}
                />
                <br />
                <h1 className="display-2 mb-3">{data.swag.title}</h1>
                <h1 className="display-4 mb-1"> {data.swag.author}</h1>
                <h1 className="display-6 mb-2"> ID: {data.swag.id}</h1>
                <p className="lead">{data.swag.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  Return to shop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
