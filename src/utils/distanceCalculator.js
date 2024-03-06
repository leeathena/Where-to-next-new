export function calculateDistance(startLat, startLon, endLat, endLon, apiKey) {
    const url = `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLon}|${endLat},${endLon}&mode=drive&apiKey=${apiKey}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.features[0].properties.distance;
        })
        .catch(error => console.error("Error calculating distance: ", error));
}