/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

$(function() {
  // Test suite for RSS feeds
  describe('RSS Feeds', function() {

    // Spec: feeds should be defined and not empty
    it('are defined', function() {
      // Check that the array allFeeds (from app.js) exists
      expect(allFeeds).toBeDefined();
      // allFeeds should not empty
      expect(allFeeds.length).not.toBe(0);
    });

    // Spec: feeds should have a URL
    it ('have a URL', function() {
      // Loop through allFeeds array and check each individual feed
      allFeeds.forEach(function(feed) {
        // Each feed should have a defined URL
        expect(feed.url).toBeDefined();
        // Feed's URL should not be empty
        expect(feed.url.length).not.toBe(0);
      });
    });

    // Spec: feeds should have a name
    it ('have a name', function() {
      // Loop through allFeeds array and check each individual feed
      allFeeds.forEach(function(feed) {
        // Each feed should retrieve a defined name
        expect(feed.name).toBeDefined();
        // Feed's name should not be empty
        expect(feed.name.length).not.toBe(0);
      });
    });
  });

  // Test suite for the site's menu functionality
  describe('The menu', function() {

    // Spec: menu should be hidden by default
    it('is hidden by default', function() {
      // Menu is hidden when DOM element <body> has class "menu-hidden"
      // Check that <body> has the correct class applied
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    // Spec: menu visibility toggles when clicking on menu icon
    it('toggles visibility when menu icon is clicked', function() {
      // Click on menu icon removes "menu-hidden" class from <body>
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);

      // Another click on menu icon, should add "menu-hidden" class to <body>
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

  });

  // Test suite to check content is loading
  describe('Initial Entries', function() {

    // Aynchronous function
    beforeEach(function(done) {
      // loadFeed can take a callback function as 2nd parameter
      // Pass done() as the callback
      loadFeed(0, done);
    });

    // Spec: Make sure feed is not empty
    it('should have at least one entry within the feed', function(done) {
      // Expect feed to load at least one populated entry
      expect($('.feed .entry').length).toBeGreaterThan(0);
      done();
    })

  });

  // Test suite to check whether changing feeds changes entries
  describe('New Feed Selection', function() {

    // Asynchronous function
    beforeEach(function(done) {
      loadFeed(0, function() {
        // Call loadFeed(0) and store it's feed value
        firstFeed = document.querySelector('.feed').innerHTML;

        loadFeed(1, function() {
          // Call loadFeed(1) and store it's feed value
          secondFeed = document.querySelector('.feed').innerHTML;
          done();
        });
      });
    });

    // Spec: content should be different depending on feed
    it('should change according to feed', function(done) {
      // Compare values from two feeds and make sure they're not equal
      expect(firstFeed).not.toBe(secondFeed);
      done();
    });

  });
}());
