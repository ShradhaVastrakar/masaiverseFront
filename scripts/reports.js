document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody');

    fetch('https://masaiback-git-main-shradhavastrakar.vercel.app/users')
        .then(response => response.json())
        .then(users => {
            const totalGuests = users.length;
            const fsdAttendees = users.filter(user => user.profession === 'FSD').length;
            const frontendAttendees = users.filter(user => user.profession === 'Frontend').length;
            const backendAttendees = users.filter(user => user.profession === 'Backend').length;
            const averageAge = calculateAverageAge(users);

            const rowData = [
                totalGuests,
                fsdAttendees,
                frontendAttendees,
                backendAttendees,
                averageAge
            ];

            populateTable(rowData);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching the data');
        });

    function populateTable(rowData) {
        const row = document.createElement('tr');
        rowData.forEach(data => {
            const cell = document.createElement('td');
            cell.textContent = data;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    }

    function calculateAverageAge(users) {
        if (users.length === 0) return 0;

        const totalAge = users.reduce((sum, user) => sum + parseInt(user.age), 0);
        return Math.round(totalAge / users.length);
    }
});

let logout = () => {
    window.location.href = "index.html"
}
