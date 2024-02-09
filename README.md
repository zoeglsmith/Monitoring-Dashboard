# Website Monitoring Application

This is a simple web application that allows you to monitor a website and retrieve basic metrics such as the title, status code, response time, number of paragraphs, images, and links.

## Getting Started

To use this application, follow these steps:

1. Clone or download this repository to your local machine.
2. Open the `index.html` file in your web browser.
3. In the input field labeled "Website URL," enter the URL of the website you want to monitor.
4. Click the "Monitor" button.
5. The application will fetch the metrics from the provided website URL and display them in the "Monitoring Results" section below the form.

## Technologies Used

- **HTML**: Used for structuring the web page.
- **CSS**: Used for styling the web page.
- **JavaScript**: Used for fetching website content and displaying metrics dynamically.

### Metrics Gathered

The application gathers the following metrics using AJAX (Fetch API) in JavaScript:

- **Title**: The title of the webpage is extracted by parsing the HTML content retrieved from the website using the Fetch API.
- **Status Code**: The HTTP status code of the response is obtained directly from the Fetch API's response object.
- **Response Time**: The response time is calculated by measuring the time difference between sending the request and receiving the response using JavaScript's `Date` object.
- **Number of Paragraphs**: The number of paragraphs in the webpage is counted by querying the HTML document for `<p>` elements after parsing the HTML content fetched using AJAX.
- **Number of Images**: The number of images in the webpage is counted by querying the HTML document for `<img>` elements after parsing the HTML content fetched using AJAX.
- **Number of Links**: The number of links in the webpage is counted by querying the HTML document for `<a>` elements after parsing the HTML content fetched using AJAX.

