import { useEffect, useState } from "react";
import "../CSS/FeedbackInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";

function FeedbackInfo() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://heart-predection.onrender.com/AdminAccess/FeedbackInfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const feedbacks = await response.json();
          setData(feedbacks);
          console.log(feedbacks)
        } else {
          console.error("Failed to fetch feedbacks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="FeedbackInfoDiv">
      <h1>User Feedbacks</h1>
      {isLoading ? (
        <p>Loading feedbacks...</p>
      ) : (
        <div className="FeedbackInfo">
          {data.length > 0 ? (
            data.map((feedback, index) => (
              <div key={index} className="FeedbackCard">
                <div className="UserInfo">
                  <FontAwesomeIcon icon={faUser} />
                  <p>{feedback.Username}</p>
                </div>
                <div className="Rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className={star <= feedback.StarRating ? "selectedStar" : "unselectedStar"}
                    />
                  ))}
                </div>
                <p>{feedback.Feedback}</p>
              </div>
            ))
          ) : (
            <p>No feedbacks available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FeedbackInfo;
