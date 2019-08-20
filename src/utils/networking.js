const fetch = require('node-fetch')

let getProductInfo = (barcode) => {
    console.log("getProductInfo was called")
    return new Promise((resolve, reject) => {
        fetch(`https://greenmap.herokuapp.com/${barcode}`)
        .then(res => {
            if (!res.ok) throw Error(`Status code ${res.status}`)
        return res.json()
    }) //end .then()
    .then(resJSON => {
        console.log("The promise resolved")
        resolve(resJSON)
        //make second api call
        }) //end then
    .catch(err => {
        console.log("The promise rejected")
        reject(err)
    })
    }) //end Promise
} //end func

export default getProductInfo


//getProductInfo('blah')
//.then(res => console.log(res))
//.catch(err => console.log(err))