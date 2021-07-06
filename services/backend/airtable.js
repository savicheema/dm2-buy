import constants from "../../constants";
import Airtable from "airtable";

Airtable.configure({
    apiKey: process.env.AIRTABLE_KEY
});

const base = Airtable.base(constants.airtable.baseId);

function getRecordBySubdomain(subdomain) {
    return new Promise((resolve, reject) => {
        base('Stores').select({
            view: 'Grid view',
            filterByFormula:`{subdomain }="${subdomain}"`
        }).firstPage(function(err, records) {
            if (err) { console.error(err); reject(err); }
            else {
                const [ record ] = records
                resolve(record? record._rawJson: null);
            }
        });
    })
}


export {
    base,
    getRecordBySubdomain
};

