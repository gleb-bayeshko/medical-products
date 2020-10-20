export const deleteColorPopUp = (e) => {
  if (document
    .querySelectorAll(".clothes-color__pop-up_shown").length === 0 || e.target.closest(".add-button")) return;
  console.log('window');
  document
    .querySelectorAll(".clothes-color__pop-up_shown")
    .forEach((colorPopUp) => {
      colorPopUp.classList.remove("clothes-color__pop-up_shown");
    });
}