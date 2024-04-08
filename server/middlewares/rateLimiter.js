function rateLimiter() {
    let requestCount = 0;
    const requestLimit = 3; // Max requests allowed per hour
    const resetInterval = 1 * 60 * 1000; // Reset counters every minute

    // Function to reset usage counters
    const resetCounter = () => {
        requestCount = 0;
    };

    // Middleware to enforce usage quotas
    const enforceQuotas = (req, res, next) => {
        // Increment request count for each incoming request
        requestCount++;

        // Check if request count exceeds the limit
        if (requestCount > requestLimit) {
            res.status(429).send('Rate limit exceeded, Please try again after 1 min')
        }else{
            console.log('requestCount', requestCount)
            next();
        }
    }

    const reset = () => {
        console.log('reseting counter after every', resetInterval)
        setInterval(resetCounter,resetInterval)
    }

    return { enforceQuotas, reset }
}

module.exports = rateLimiter;