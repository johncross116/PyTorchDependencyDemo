// Run the python script
async function runStep4() {
    try {
        const response = await fetch(`/runStep4`);
  
        if (!response.ok) { // Check for HTTP errors (e.g., 500)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.text();
        console.log("runStep4 complete " + data);
        return data;
    } catch (error) {
        return error.message;
    }
  }


