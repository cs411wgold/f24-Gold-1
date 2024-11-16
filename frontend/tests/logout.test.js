/**
 * Reference:
 * https://www.lambdatest.com/jest
 * https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/
 */
// Set up the DOM to simulate logout button
document.body.innerHTML = `<button id="logoutButton">Logout</button>`;

// Recreate simple logout function based on functionality from logout.js
// Simple logout removes email, password, and name information from localStorage
// and redirects the user to the login page
function logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('name');
    window.location.href = '../login/login.html';
}

// Attach the event listener to simulated logout button to call logout() when
// simulated button is clicked
document.getElementById('logoutButton').addEventListener('click', logout);


describe('Logout Functionality', () => {
    beforeEach(() => {
        // Create mock localStorage to check if removeItem is used.  If removeItem is called, 
        // Jest mock function jest.fn() is called to track it
        Object.defineProperty(window, 'localStorage', {
            value: {
                removeItem: jest.fn(),
            },
            writable: true, // ensure mock localStorage is not read-only
        });

        // Mock window.location to check that redirect is working
        Object.defineProperty(window, 'location', {
            value: {
                href: '',
            },
            writable: true,
        });
    });

    // After each test is ran, delete all mock data to eliminate potential interference with other tests
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Simulate clicking logoutButton and check to see if removeItems was called on email,
    // password, and name
    it('should remove email, password, and name from localStorage', () => {
        const button = document.getElementById('logoutButton');
        button.click();

        expect(localStorage.removeItem).toHaveBeenCalledWith('email');
        expect(localStorage.removeItem).toHaveBeenCalledWith('password');
        expect(localStorage.removeItem).toHaveBeenCalledWith('name');
    });

    // Simulate clicking logoutbutton and check to see if logout functionality successfully 
    // leads to redirecting user to login page by verifying window.location.href
    it('should redirect to login page', () => {
        const button = document.getElementById('logoutButton');
        button.click();

        expect(window.location.href).toBe('../login/login.html');
    });
});
