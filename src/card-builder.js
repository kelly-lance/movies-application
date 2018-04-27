

//------------module for creating cards---------------->
export default (title, rating, id) => `<div class="col-lg-4 mt-4"><div class=card><div class="thumbnail"><a id="${id}" class="close mr-2 mt-1" href="#">×</a>
    <div class=card-body>
         <h2>${title}</h2>
          <div class="rateYo" data-rating="${rating}"></div>
          <a class="float-right mb-3 editMe" href="#" data-id="${id}">Edit Movie</a>
    </div></div>`;



// check for duplicate IDs, convert to class
// wire the modal close/hide to the edit button on the modal
// ensure we're editing the right thing