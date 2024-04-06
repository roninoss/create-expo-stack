import { spinner } from "@clack/prompts";

var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");

const fetchURL = "http://git:8000";

export async function initializeProject(cliResults) {
  const formattedCliResults = JSON.stringify(cliResults, (key, value) =>
    typeof value === "string" ? value.replace(/'/g, '"') : value,
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formattedCliResults,
    redirect: "follow",
  };

  const s = spinner();
  s.start("Initializing your project...");

  try {
    // CALL ENDPOINT HERE WITH CLI RESULTS
    const response = await fetch(fetchURL, requestOptions);
    console.log(response.text());
  } catch (error) {
    console.log("error", error);
  } finally {
    s.stop("Project initialized!");
  }
}
