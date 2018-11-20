const serviceModule = (() => {
    // Generic method to fetch data from an endpoint
    const fetchData = (url) => {
        return fetch(url)
        .then(res => res.json())
        .then(res => res)
        .catch((error) => {
            console.log(error)
        })    
    }
    return {
        fetchData
    }
})();

export default serviceModule;