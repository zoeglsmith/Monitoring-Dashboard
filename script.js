document
  .getElementById("websiteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var websiteUrl = document.getElementById("websiteUrl").value;

    // Make an AJAX request to fetch website metrics
    fetchMetrics(websiteUrl);
  });

function fetchMetrics(websiteUrl) {
  var startTime = new Date().getTime(); // Get the current time before making the request

  // Fetch the webpage content using fetch API
  fetch(websiteUrl)
    .then((response) => {
      // Check if response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Calculate the response time
      var endTime = new Date().getTime(); // Get the current time after receiving the response
      var responseTime = endTime - startTime;

      // Return the response and response time
      return {
        response: response,
        responseTime: responseTime,
      };
    })
    .then(({ response, responseTime }) => {
      // Get the status code of the response
      var statusCode = response.status;

      // Parse the HTML content using DOMParser
      return response.text().then((html) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");

        // Get the title of the webpage
        var title = doc.querySelector("title").textContent;

        // Display the metrics
        var monitoringResults = document.getElementById("monitoringResults");
        monitoringResults.innerHTML =
          "<p>Monitoring website: <strong>" + websiteUrl + "</strong></p>";
        monitoringResults.innerHTML +=
          "<p>Title: <strong>" + title + "</strong></p>";
        monitoringResults.innerHTML +=
          "<p>Status Code: <strong>" + statusCode + "</strong></p>";
        monitoringResults.innerHTML +=
          "<p>Response Time: <strong>" + responseTime + " ms</strong></p>";
      });
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
      var monitoringResults = document.getElementById("monitoringResults");
      monitoringResults.innerHTML =
        "<p>Error fetching metrics for the website.</p>";
    });
}
