/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('array allFeeds is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('checks allFeeds to ensure they have a URL defined', function() {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('checks allFeeds to ensure they have a name defined and is not empty', function() {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("has the menu hidden by default", function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it("tests click events on the menu hamburger to ensure menu is properly revealed and then hidden", function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
         });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            if (allFeeds.length >= 1) {
                loadFeed(0, function() {
                    done();
                });
            }
        });
        it("ensures allFeeds array contains at least 1 element", function() {
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        it("tests to ensure loadFeed function returns at least a single .entry element within the .feed container", function(){
            expect($('.feed').children()[0]).toBeDefined();    
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("News Feed Selection", function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */ 
        var oldFeed;
    
        beforeEach(function(done) {
            if (allFeeds.length >= 1) {
                loadFeed(1, function() {
                    done();
                });
            }
            oldFeed = $('.feed').children();
        });
        afterEach(function(done) {
            loadFeed(0, function() {
                done();
            })
        });
        it("ensures allFeeds array contains at least 2 elements", function() {
            expect(allFeeds.length).toBeGreaterThan(1);
        });

        it("ensures when a new feed is loaded, .feed content actually changes", function() {
            console.log('newFeed', $('.feed').children()[0].outerHTML);
            console.log('oldFeed',oldFeed.children()[0].outerHTML);
            expect($('.feed').children()[0].outerHTML).not.toEqual(oldFeed[0].outerHTML);
        });
    });
        
    
}());
