document.addEventListener("DOMContentLoaded", function () {
    const orcidId = 'YOUR-ORCID-ID'; // Replace with your ORCID ID
    const apiUrl = `https://pub.orcid.org/v3.0/${orcidId}/works`;

    fetch(apiUrl, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const publicationsContainer = document.getElementById('publications');
        data.group.forEach(pub => {
            const title = pub['work-summary'][0]['title']['title']['value'];
            const publication = document.createElement('p');
            publication.textContent = title;
            publicationsContainer.appendChild(publication);
        });
    })
    .catch(error => console.error('Error fetching ORCID data:', error));
});
