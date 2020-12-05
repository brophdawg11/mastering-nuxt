export default function apiPlugin(ctx, inject) {
    const appId = 'PKLXWAH1SN';
    const searchOnlyApiKey = 'c6819e479a69b72e2fc877e0a1fd18e4';

    async function getHome(homeId) {
        const url = `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`;
        const response = await fetch(url, {
            headers: {
                'X-Algolia-Application-Id': appId,
                'X-Algolia-API-Key': searchOnlyApiKey,
            }
        });
        const data = await response.json();
        return data;
    }

    inject('api', { getHome });
}