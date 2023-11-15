import { useState, useEffect } from "react";

export function useFormattedStars() {
  const [formattedStars, setFormattedStars] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch('https://api.github.com/repos/danstepanov/create-expo-stack')
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log('Data:', data);
            return data.stargazers_count;
          });

        setFormattedStars(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return formattedStars;
}
