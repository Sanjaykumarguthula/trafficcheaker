(function() {
    // A simple function to generate a unique user ID
    function getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    // A function to track a page view
    function trackPageView() {
        const data = {
            userId: getUserId(),
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        };

        // Send the data to the backend
        navigator.sendBeacon('/track', JSON.stringify(data));
    }

    // Track the initial page view
    trackPageView();
})();
