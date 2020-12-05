const appId = 'PKLXWAH1SN';
const searchOnlyApiKey = 'c6819e479a69b72e2fc877e0a1fd18e4';
const baseUrl = `https://${appId}-dsn.algolia.net`;
const headers = {
    'X-Algolia-Application-Id': appId,
    'X-Algolia-API-Key': searchOnlyApiKey,
};

export default function apiPlugin(ctx, inject) {
    async function getHome(homeId) {
        const url = `${baseUrl}/1/indexes/homes/${homeId}`;
        try {
            const response = await fetch(url, { headers });
            const data = await response.json();
            const { ok, status, statusText } = response;
            return {
                ok,
                status,
                statusText,
                home: data,
            };
        } catch (e) {
            return {
                ok: false,
                status: 500,
                statusText: e.message,
                home: null,
            };
        }
    }

    inject('api', { getHome });
}