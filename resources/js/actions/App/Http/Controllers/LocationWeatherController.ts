const show = Object.assign(
    (_parameters: {
        query: { latitude: number; longitude: number };
    }): string => '/api/location/weather',
    {
        url: (parameters: {
            query: { latitude: number; longitude: number };
        }): string => {
            const query = new URLSearchParams({
                latitude: String(parameters.query.latitude),
                longitude: String(parameters.query.longitude),
            });

            return `/api/location/weather?${query.toString()}`;
        },
    },
);

export default { show };
