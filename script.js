// Define your API key
const apiKey = 'RGAPI-a2b25d7e-5721-4189-80f1-61cc8a13ca48';

// Make an API request
fetch(`https://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json`)
  .then(response => response.json()) // Parse response as JSON
  .then(data => {
    // Extract the champion data
    const champions = Object.values(data.data);

    // Display the splash arts
    const championImagesContainer = document.getElementById('championImages');

    champions.forEach(champion => {
      const imageElement = document.createElement('img');
      const championName = champion.name.replace(/\s/g, ''); // Remove spaces from the champion name
      imageElement.src = `https://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${champion.image.full}`;
      imageElement.alt = champion.name;
      imageElement.classList.add('champion-image');
      imageElement.id = championName; // Set a unique id for each image

      // Replaces Quinn's original splashart with my local image
      if (championName.toLowerCase() === 'quinn') {
        imageElement.src = 'quinn.png';
      } else {
        imageElement.src = `https://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${champion.image.full}`;
      }

      championImagesContainer.appendChild(imageElement);

      // Add drag event listeners to the images
      imageElement.addEventListener('dragstart', dragStart);
      imageElement.addEventListener('dragend', dragEnd);
    });

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', handleSearch);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function dragStart(event) {
  this.classList.add('dragging');
  event.dataTransfer.setData('text/plain', event.target.id);
}

function dragEnd() {
  this.classList.remove('dragging');
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter() {
  this.classList.add('drag-over');
}

function dragLeave() {
  this.classList.remove('drag-over');
}

function dragDrop(event) {
  event.preventDefault();
  const draggedImageId = event.dataTransfer.getData('text/plain');
  const draggedImage = document.getElementById(draggedImageId);

  // Clone the dragged image
  const clonedImage = draggedImage.cloneNode(true);

  // Append the cloned image to the draggable area
  this.appendChild(clonedImage);

  this.classList.remove('drag-over');
}

function deleteImage(event) {
  if (event.target.classList.contains('champion-image')) {
    // Remove the clicked image from the DOM
    event.target.remove();
  }
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  filterChampionImages(searchTerm);
}

function filterChampionImages(searchTerm) {
  const championImages = document.querySelectorAll('.champion-image');

  championImages.forEach(championImage => {
    const championName = championImage.alt.toLowerCase();

    if (championName.includes(searchTerm)) {
      championImage.classList.remove('fade-out');
    } else {
      championImage.classList.add('fade-out');
    }
  });
}


