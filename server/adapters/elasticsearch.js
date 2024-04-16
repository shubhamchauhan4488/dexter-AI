const { Client } = require('@elastic/elasticsearch');

let esClientInstance;

// ensuring singleton instance
function getElasticSearchClient() {
    if (!esClientInstance) {
        esClientInstance = new Client({
            node: process.env.GCP_ELASTICSEARCH_ENDPOINT,
            cloud: {
                id: process.env.GCP_ELASTIC_CLOUD_ID,
            },
            auth: {
                apiKey: process.env.GCP_ELASTIC_CLOUD_AUTH_KEY
            }
        });

    }
    return esClientInstance;
}

async function fetchByPhrase(params) {
    try {
        const client = getElasticSearchClient();
        const response = await client.search(params);
        return response;
    } catch (error) {
        console.error('Error performing Elasticsearch search:', error);
        throw error;
    }
}

async function writeIndex(params) {
    try {
        const client = getElasticSearchClient();
        const response = await client.index(params);
        return response;
    } catch (error) {
        console.error('Error performing Elasticsearch search:', error);
        throw error;
    }
}

module.exports = { fetchByPhrase, writeIndex };
