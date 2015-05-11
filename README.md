# Enwritt

[Heroku link] TBD

[heroku]: TBD

## Minimum Viable Product
Enwritt is a Scribd clone built on Rails and Backbone.
<!-- This is a Markdown checklist. Use it to keep track of your progress! -->
Users can:
- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Have a library listing all purchased books and collections
- [ ] Create and publish books
- [ ] Create collections
- [ ] Purchase/Sell Books
- [ ] Add books to collections
- [ ] Download purchased books as PDF
- [ ] Narrow search for books within collection/library

Anyone can:
- [ ] Preview books
- [ ] Search for books by title and author

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, User's library page (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. Once user authentication is running, I will build a Library page
for the user. I will style the Library page so that the page will have section
containers that Backbone views will populate.
[Details][phase-one]

### Phase 2: Viewing Collections and Books (~2 days)
I will add API routes to serve collections and books as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to create collections, publish books and see their
own library populated with data about their collections and books.

[Details][phase-two]

### Phase 3: Uploading/Downloading books' PDF and Editing Collections (~2 days)
I will implement third-party libraries to allow users to upload books as PDF.
While authoring a book, users can attach an image as a cover image for the book.
I will implement file upload fields for "Book New" form so users can upload both
the PDF for book content and the image for the cover.

[Details][phase-three]

### Phase 4: Searching for Anyone (~1-2 days)
I will implement a search view that anyone can type in. The search functionality
can take the options to search by title, author, year of publishing and genres.
The view will be composed of a textbox in which users type in, a set of
checkboxes that users can check to narrow the search to specific fields, and a
search results view that contain a list of mathing results.  

[Details][phase-four]

### Phase 5: Searching within Users' Library and Collections (~2 days)
I will implement a search box specific to the users' library and collection. The
search will only look for books within the users' library or collection. The
search bar will be part of the "Book Index" view to search within the library.
For "Collection show", a search bar will be implemented so users can search for
books within the collection.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Sales counter
- [ ] User avatars
- [ ] Author profiles
- [ ] Author rankings
- [ ] Pagination/infinite scroll
- [ ] Rating/Reviews
- [ ] Recently viewed
- [ ] Wishlists
- [ ] Recommendations

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
