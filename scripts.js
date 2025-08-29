document.addEventListener('DOMContentLoaded', () => {
            
            const form = document.getElementById('patientForm');
            const statusMessage = document.getElementById('statusMessage');

            form.addEventListener('submit', (event) => {
                // Prevent the default browser action (which is to refresh the page)
                event.preventDefault();

                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                console.log(JSON.stringify(data))

                statusMessage.textContent = 'Sending data...';
                statusMessage.className = 'status-message';


                fetch('http://10.200.109.149:7000/patients', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Server responded with error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(responseData => {

                    console.log('Success:', responseData);
                    statusMessage.textContent = responseData.message || 'Data submitted successfully!';
                    statusMessage.className = 'status-message success';
                    form.reset();
                })
                .catch(error => {
                    
                    console.error('Error:', error);
                    statusMessage.textContent = 'Failed to submit data. Please try again later.';
                    statusMessage.className = 'status-message error';
                });
            });
        });