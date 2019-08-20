const fetch = require('node-fetch')

let getProductInfo = (barcode) => {
    return new Promise((resolve, reject) => {
        fetch(`https://greenmap.herokuapp.com/${barcode}`)
        .then(res => {
            if (!res.ok) throw Error(`Status code ${res.status}`)
        return res.json()
    }) //end .then()
    .then(resJSON => {
        resolve(resJSON)
        //make second api call
        }) //end then
    .catch(err => reject(err))
    }) //end Promise
} //end func

export default getProductInfo


//getProductInfo('blah')
//.then(res => console.log(res))
//.catch(err => console.log(err))