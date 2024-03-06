export const DEFAULT_LOCATION = {
    latitude: 51.5074, // London
    longitude: -0.1278
};

export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                () => {
                    console.warn("You have not allowed your location to be determined. London is taken.");
                    resolve({
                        coords: {
                            latitude: DEFAULT_LOCATION.latitude,
                            longitude: DEFAULT_LOCATION.longitude
                        }
                    });
                }
            );
        } else {
            console.warn("Geolocation is not supported by your browser. London is taken.");
            resolve({
                coords: {
                    latitude: DEFAULT_LOCATION.latitude,
                    longitude: DEFAULT_LOCATION.longitude
                }
            });
        }
    });
}