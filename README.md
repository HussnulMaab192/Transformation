# Transformation
# JSON Transformation Tool

This project is a JSON transformation tool that allows users to convert JSON data according to a specific schema. Users can input their JSON data, select a transformation schema, and then convert the data to the desired format.

## Features

- Transform JSON data based on a predefined schema.
- Input JSON data via a text box.
- Select the transformation schema.
- Convert and display the transformed JSON.

## Usage

## API Endpoint

To programmatically perform JSON transformations, you can use the API endpoint `/api/post-transform-data`. Follow the details below to make API requests:

- **Method**: POST
- **Endpoint URL**: `http://localhost:5000/api/post-transform-data` (replace with the appropriate URL where your server is hosted)

### Request

The API endpoint expects a JSON request with the following structure:

```json
{
   "key":"",
   "Object": {
     // Your Object which need to be parse here 
   }
}
Note:Input Object Must be sent In Array 
