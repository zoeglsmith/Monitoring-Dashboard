// Client-side JavaScript code
document
  .getElementById("websiteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var websiteUrl = document.getElementById("websiteUrl").value;
    fetchMetrics(
      "http://localhost:3000/fetch?url=" + encodeURIComponent(websiteUrl)
    );
  });

function fetchMetrics(proxyUrl) {
  var startTime = new Date().getTime();

  fetch(proxyUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      var endTime = new Date().getTime();
      var responseTime = endTime - startTime;
      return {
        response: response,
        responseTime: responseTime,
        websiteUrl: decodeURIComponent(proxyUrl.split("=")[1]), // Extract websiteUrl from proxyUrl
      };
    })
    .then(({ response, responseTime, websiteUrl }) => {
      var statusCode = response.status;
      return response.text().then((html) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");

        var title = doc.querySelector("title").textContent;
        var paragraphs = doc.querySelectorAll("p").length;
        var images = doc.querySelectorAll("img").length;
        var links = doc.querySelectorAll("a").length;

        var monitoringResults = document.getElementById("monitoringResults");
        monitoringResults.innerHTML =
          "<p>Monitoring website: <strong>" + websiteUrl + "</strong></p>";
        monitoringResults.innerHTML +=
          "<p>Title: <strong>" + title + "</strong></p>";
        monitoringResults.innerHTML +=
          "<p>Status Code: <strong>" + statusCode + "</strong></p>";
        monitoringResults.innerHTML +=
          "<p>Response Time: <strong>" + responseTime + " ms</strong></p>";
        monitoringResults.innerHTML +=
          "<p>Number of Paragraphs: <strong>" + paragraphs + "</strong></p>";
        monitoringResults.innerHTML +=
          "<p>Number of Images: <strong>" + images + "</strong></p>";
        monitoringResults.innerHTML +=
          "<p>Number of Links: <strong>" + links + "</strong></p>";
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      var monitoringResults = document.getElementById("monitoringResults");
      monitoringResults.innerHTML =
        "<p>Error fetching metrics for the website.</p>";
    });
}
