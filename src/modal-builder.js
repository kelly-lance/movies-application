export default (title, rating, id) =>

    `<div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body" id="editBackground">
                <div class="card">
                    <div class="card-header text-white bg-dark text-center">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                        <h1>Edit Movie</h1>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <form id="editModal">
                                    <div class="form-group" id="${id}">
                                        <label for="input">Edit Title</label>
                                        <input type="text" class="form-control editInput" aria-describedby="input"
                                               placeholder="${title}">
                                    </div>
                                    <div class="form-group">
                                        <div class="rateYo editRating" data-rating="${rating}"></div>
                                        <small>Rate movie</small>
                                    </div>

                                    <button type="button" class="btn btn-dark" data-id="${id}" id="editButton">Edit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

