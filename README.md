# TestSuite

## Overview

**TestSuite** is a comprehensive tool designed to assist developers in writing unit tests and docstrings for their code. By leveraging the Google Gemini API with the `dspy` library, TestSuite generates accurate and relevant docstrings and unit tests based on the provided code and expected output. Additionally, it measures code coverage and provides detailed coverage reports to ensure the effectiveness of your test cases.

## Features

- **Docstring Generation**: Automatically generate docstrings for your code based on the given code and expected output.
- **Unit Test Creation**: Create unit tests that validate the correctness of your code against the expected output.
  
## Technologies

- **Frontend**: React
- **Backend**: Django
- **AI Integration**: Google Gemini API with `dspy` library

## Getting Started

### Prerequisites

- Node.js and npm (for React frontend)
- Python and Django (for backend)
- Google Gemini API credentials
- `dspy` library for interacting with Google Gemini

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/testsuite.git
   cd testsuite
   ```

2. **Set up the backend:**

   ```bash
   cd backend
   python manage.py migrate
   python manage.py runserver
   ```

3. **Set up the frontend:**

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Configure API keys:**

   - Create a `.env` file in the `backend` directory and add your Google Gemini API credentials.

### Usage

1. **Access the Frontend:**
   Open your web browser and navigate to `http://localhost`. Here, you can input your code and expected output to generate docstrings and unit tests.

2. **Generate Docstrings and Unit Tests:**
   - Enter your code and the expected output in the designated fields.
   - Click the "Generate" button to receive generated docstrings and unit tests.


## License

This project is licensed under the MIT License.
