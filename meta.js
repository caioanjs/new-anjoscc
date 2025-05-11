// Function to load meta tags
function loadMetaTags() {
    fetch('meta.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const metaTags = doc.getElementsByTagName('meta');
            const linkTags = doc.getElementsByTagName('link');
            
            // Add meta tags
            for (let tag of metaTags) {
                document.head.appendChild(tag.cloneNode(true));
            }
            
            // Add link tags
            for (let tag of linkTags) {
                document.head.appendChild(tag.cloneNode(true));
            }
        });
}

// Load meta tags when the page loads
document.addEventListener('DOMContentLoaded', loadMetaTags); 