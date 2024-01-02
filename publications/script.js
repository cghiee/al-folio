document.addEventListener("DOMContentLoaded", function () {
    const orcidId = '0000-0002-4700-2105'; // Replace with your ORCID ID
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
            const workSummary = pub['work-summary'][0];

            // Extracting the title
            const title = workSummary['title']['title']['value'];

            // Extracting the publication date
            const pubDate = workSummary['publication-date'];
            const year = pubDate ? pubDate['year']['value'] : 'Unknown';

            // Extracting the journal title
            const journalTitle = workSummary['journal-title'] ? workSummary['journal-title']['value'] : 'Unknown';

            // Extracting the DOI
            const doi = workSummary['external-ids']['external-id'].find(id => id['external-id-type'] === 'doi');
            const doiValue = doi ? doi['external-id-value'] : 'Unknown';

            // Extracting authors
            const contributors = workSummary['contributors'] ? workSummary['contributors']['contributor'] : [];
            const authors = contributors.map(contributor => {
                return contributor['credit-name'] ? contributor['credit-name']['value'] : 'Unknown';
            }).join(', ');

            // Creating the publication entry
            const publicationEntry = document.createElement('div');
            publicationEntry.innerHTML = `
                <h3>${title}</h3>
                <p>Authors: ${authors}</p>
                <p>Publication Year: ${year}</p>
                <p>Journal: ${journalTitle}</p>
                <p>DOI: ${doiValue}</p>
            `;
            publicationsContainer.appendChild(publicationEntry);
        });
    })
    .catch(error => console.error('Error fetching ORCID data:', error));
});
