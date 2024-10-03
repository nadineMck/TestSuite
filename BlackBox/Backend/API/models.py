from django.db import models

import dspy
import os
import coverage

api_key = "AIzaSyBYEmC0DnXLqEUaH1gg0try7iWFX3S7QAk"


gemini = dspy.Google("models/gemini-1.5-flash", api_key=api_key)

dspy.settings.configure(lm=gemini, max_tokens=1024)
class TestGenerator(dspy.Signature):
    """ A generator that uses Gemini to generate unittest."""
    code = dspy.InputField(desc = " Function with test case and output.")
    unittest = dspy.OutputField(desc = "Given the following Python function, test case and expected output, generate only a minimal unit test using the unittest framework. "
            "Do not include any extra explanation or code. Just return the unittest code. "
            "The function to test with test case and output is: {code} ### Expected unittest output: ")
class DocGenerator(dspy.Signature):
    """ A generator that uses Gemini to generate docstrings."""
    code = dspy.InputField(desc = " Function with test case and output.")
    docstring = dspy.OutputField(desc = "Given the following Python function, write a docstring in the specified format. "
            "Do not include any other code or explanations."
            "Insert the docstring between the function signature and the function body. "
            "Return only the function with the docstring inserted, without the given testcase, the output and any additional line of code in the code i'm giving you."
            "Do not return the function call(the test case)"
            "Do not return any additional line of code, like variable definitions not relevant to the definition of the function, even if present in {code}"
            "Use the following format for the docstring:\n"
            '"""\n'
            "Function brief description.\n\n"
            "Parameters:\n"
            "variable Name (type): Description of the first parameter.\n"
            "variable Name (type): Description of the second parameter.\n\n"
            "Returns:\n"
            "return type: Description of the return value.\n"
            '"""\n'
            "The function is: {code} ### Expected function with docstring output: ")
    

    
class CoverageGenerator(dspy.Signature):
    code = dspy.InputField(desc="")
    
test = dspy.Predict(TestGenerator)
doc = dspy.Predict(DocGenerator)

import subprocess
import tempfile
import os

def string_to_script(code_string):
    # Code to add at the beginning of the script
    coverage_start = """
import coverage
import unittest
cov = coverage.Coverage()
cov.start()
"""
    
    # Code to add at the end of the script
    coverage_end = """
cov.stop()
cov.save()
#cov.report() 
report_output = cov.report(show_missing=True)
print(report_output)
"""
    
    # Create a temporary file with .py extension
    temp_script = tempfile.NamedTemporaryFile(delete=False, suffix=".py", mode='w')
    
    # Write the coverage_start, original code, and coverage_end to the file
    temp_script.write(coverage_start + code_string + coverage_end)
    temp_script.close()  # Close the file to make it executable

    return temp_script.name  # Return the filename to execute it later

def execute_script(script_path):
    try:
        # Execute the script using subprocess and capture the output
        result = subprocess.run(['python', script_path], capture_output=True, text=True)
        return result.stdout, result.stderr
    finally:
        # Optionally, delete the temporary script after execution
        os.remove(script_path)


string_to_script=string_to_script
execute_script=execute_script

