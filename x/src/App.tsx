import { useState, useEffect } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import "./App.css";

function App() {
  const [tweetId, setTweetId] = useState<string | null>(null);

  useEffect(() => {
    // Extract tweet ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    setTweetId(id);
  }, []);

  return (
    <div className="App">
      {tweetId ? (
        <div style={{ width: "100%", maxWidth: "550px", margin: "0 auto" }}>
          <TwitterTweetEmbed tweetId={tweetId} />
        </div>
      ) : (
        <div>
          <h1>Tweet Embed</h1>
          <p>No tweet ID provided. Add a tweetId parameter to the URL.</p>
        </div>
      )}
    </div>
  );
}

export default App;
