function closePopup() {
     const popupContent = document.getElementById('popup-content');
     popupContent.textContent = ''

     popupContent.parentElement.parentElement.style.display = 'none';
}