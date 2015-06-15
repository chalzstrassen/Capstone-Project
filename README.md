# Enwritt

[Live](http://www.enwritt.us)

## Description
Enwritt is an open publishing platform inspired by Scribd built on Rails and Backbone. Read and publish any books in pdf format. Comment and like books and authors.

## Technicals
### Backend
- [Ruby](http://ruby-doc.org/)
- [Ruby on Rails](http://guides.rubyonrails.org/getting_started.html)
- [PostgreSQL](http://www.postgresql.org)

### Frontend
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [Backbone.js](http://backbonejs.org/)
- [Underscore.js](http://underscorejs.org/)
- [jQuery](https://jquery.com/)
- [jQuery.serializejson](https://github.com/marioizquierdo/jquery.serializeJSON)
- [backbone.modaldialog](https://github.com/GarethElms/BackboneJSModalView)

## Challenges
- Ensuring that users do not see the option of adding a book that already exists in a collection.
- Filtering the search-results for books by genre.

## TODOs
- Migrate all Rails models to Backbone models.
- Integrate Backbone views to the frontend.
- Enable users to have a profile picture, provide a default if none is given.
- Progress Bars for requests that can take a while (i.e Uploads).
- Create a content sidebar that displays recently viewed items (Cookies mmmh!).
