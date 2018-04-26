

//------------module for creating cards---------------->
export default (title, rating) => `<div class="col-lg-4 mt-4"><div class=card>
    <div class=card-body>
         <h2>${title}</h2>
          <div class="rateYo" data-rating="${rating}"></div>
    </div></div>`;
