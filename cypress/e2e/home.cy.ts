describe("Mundane Movies Galore", () => {
  
  context("Good Enough!", () => {
    
    beforeEach(() => {
      cy.visit("/");
    });

    it("Should not allow searches without input", () => {
      cy.getById("formMovieSearch")
        .should("be.visible")
        .find("input")
        .should("have.value", "");

      cy.get("[type='submit']")
        .click();

      cy.get("[role='alert']")
        .should("be.visible")
        .find("p")
        .contains("You tried to search, good for you! 👀");
    });

    it("Should not allow searches with less than 3 characters", () => {
      cy.getById("formMovieSearch")
        .should("be.visible")
        .find("input")
        .type("Eh{enter}");

      cy.get("[role='alert']")
        .should("be.visible")
        .find("p")
        .contains("Search query must be at least 3 characters long, duh ^^ 🙄");
    });

    it("Should be able to search for The Matrix and get X amount of hits", () => {
      cy.getById("formMovieSearch")
        .should("be.visible")
        .find("input")
        .type("The Matrix{enter}");

      cy.get('.movie-list .movie-list-item')
        .should('have.length.at.least', 1);

    });

    it("Should show a loading spinner whilst searching", () => {
      cy.getById("formMovieSearch")
        .should("be.visible")
        .find("input")
        .type("The Matrix{enter}");

      cy.getById("loading-wrapper")
        .should("be.visible");
    });

    it("Should be able to click on a title (when finished loading) and resulting page should match title's ID", () => {

      cy.getById("formMovieSearch")
        .should("be.visible")
        .find("input")
        .type("The Matrix{enter}");
      
      cy.getById("loading-wrapper")
        .should("be.visible");

      cy.get("#loading-wrapper", { timeout: 10000 })  // stop laughing at me..
        .should("not.exist");  

        cy.get('.movie-list [data-imdb-id]')
        .first()
        .as("firstMovie")
        .invoke("attr", "data-imdb-id")
        .then(movieId => {
          cy.get("@firstMovie").find("a").contains("View Details").click();

          cy.location("pathname").should("equal", `/movies/${movieId}`);
        });

    });

  });
  
  context("Vell Done!", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Should not show loading wrapper when search has finished loading", () => {
      cy.getById("formMovieSearch")
        .should("be.visible")
        .find("input")
        .type("The Matrix{enter}");
      
      cy.getById("loading-wrapper")
        .should("be.visible");

      cy.get("#loading-wrapper", { timeout: 10000 })  // stop laughing at me.. again
        .should("not.exist");  
    });

    it("Should be able to search for 'Cat Memes' and not get any results", () => {
      cy.getById("formMovieSearch")
        .should("be.visible")
        .find("input")
        .type("Cat Memes{enter}");

      cy.get('.movie-list')
        .should("not.exist");

      cy.get("[role='alert']")
        .should("be.visible")
        .find("p")
        .contains("Movie not found!");
    });

    it("Should get a specific message 5+ secounds after searching for 'The Postman always rings twice'", () => {
      cy.getById("formMovieSearch")
        .should("be.visible")
        .find("input")
        .type("The Postman always rings twice{enter}");

      cy.get('.movie-list')
        .should("not.exist");

      cy.get("[role='alert']", { timeout: 10000 })
        .should("be.visible")
        .find("p")
        .contains("Does he, really?");
    });

    it("Should get an error message if trying to visit /movies/tt1337", () => {
      cy.visit("/movies/tt1337");
      
      cy.get("[role='alert']")
        .should("be.visible")
        .find("div")
        .contains("LOL, what a fail")
        .siblings("p")
        .contains("Haxx0r now, are we?");
    });

    it("Should get an error message if trying to visit non-existing page", () => {
      cy.visit("/xxx");
      
      cy.get("[role='alert']")
        .should("be.visible")
        .find("div")
        .contains("It's not us, it's you")
        .siblings("p")
        .contains("That page does not exist. You should be ashamed of yourself.");
    });
  });

  context("Mocked requests", () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://www.omdbapi.com/?s=The%20Matrix&type=movie&apikey=c407a477',
        { fixture: 'search-matrix.json' }
      ).as('searchMatrixReq');
    
      cy.intercept(
        'GET',
        'https://www.omdbapi.com/?i=tt0133093&apikey=c407a477',
        { fixture: 'matrix-details.json' }
      ).as('matrixDetailsReq');
    
      cy.visit("/");
    });

    it("Should list 10 mocked results when searching for 'The Matrix'", () => {
      cy.getById("formMovieSearch")
        .should("be.visible")
        .find("input")
        .type("The Matrix{enter}");

      // cy.wait("@searchMatrixReq");

      cy.get(".movie-list .movie-list-item")
        .should("have.length", 10);  
        
      cy.get(".movie-list [data-imdb-id='tt0133093'] .card-title")
        .contains("The Mocktrix");
    });

    it("Should show mocked result when navigating to the 'The Matrix'", () => {
      cy.visit("/?q=The+Matrix");
      // cy.wait("@searchMatrixReq");

      cy.get(".movie-list [data-imdb-id='tt0133093'] a")
        .contains("View Details")
        .click();

      // cy.wait("@matrixDetailsReq");

      cy.location("pathname")
        .should("equal", "/movies/tt0133093");

      cy.get(".card-title")
        .contains("The Mocktrix");
    });
  });
  

});

