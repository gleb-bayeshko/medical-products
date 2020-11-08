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

export const deleteSortPopUp = (e) => {
  if (document
    .querySelectorAll(".sort-pop-up_shown").length === 0 || e.target.classList.contains("sort-category")) return;
  document
    .querySelectorAll(".sort-pop-up_shown")
    .forEach((sortPopUp) => {
      sortPopUp.classList.remove("sort-pop-up_shown");
    });
}