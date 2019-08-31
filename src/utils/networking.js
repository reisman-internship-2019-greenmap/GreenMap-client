const fetch = require('node-fetch')

const getProductInfo = (barcode) => {

    // wraps the fetch call in a promise that resolves with
    // a successful query (Status code is 200-299)
    // Rejects if the status code is not 200-299

    //var responsePromise = new Promise ((resolve, reject) => {
    //    fetch(`https://greenmap.herokuapp.com/${barcode}`)
    //        .then(res => {
    //            if (!res.ok) throw Error(res.status)
    //        return res.json()
    //    }) //end .then()
    //    .then(resJSON => {
    //        console.log("The promise resolved")
    //        resolve(resJSON)
    //        }) //end then
    //    .catch(err => {
    //        console.log("The promise rejected")
    //        reject(err)
    //    })
    //})

    // A simple Prosmise that resolves after 5 seconds.
    // When passed to Promise.race, this promise will resolve
    // if the server does not send a response within 5 seconds.
    var connectionTimeoutPromise = new Promise ((reject) => {
        setTimeout(reject, 5000, "The connection timed out")
    })

    //for mocking a slow server - testing only
    var dummySlowPromise = new Promise ((resolve) => {
        setTimeout(resolve, 6000, "Dummy slow promise")
    })


    /** The result could be one of three things:
     * 1. An object containing the data sent by the server
     *    Occurs when the server reponds with a success
     * 2. A numerical status code
     *    Occurs when the server response with an error
     * 3. A string saying the connection timed out
     *    Occurs when the server does not respond within 5 seconds.
     * 
     * The only time getProductInfo returns a resolved promise is when
     * the server responds with a success.
    */

    return Promise.race([dummySlowPromise, connectionTimeoutPromise])
}
export default getProductInfo
