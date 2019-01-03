const commonModule = (() => {
    // Truncate values to decimal places
    const truncateToTwoDecimal = (value) => {
        return parseInt(value*100)/100;
    }

    // Parse json post stringifying
    // Takes care of immutability while assigning objects
    const parseJson = (jsonObj) => {
        return JSON.parse(JSON.stringify(jsonObj))
    }

    return {
        truncateToTwoDecimal,
        parseJson
    }
})();

export default commonModule;