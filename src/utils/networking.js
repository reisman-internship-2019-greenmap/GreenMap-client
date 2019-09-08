const fetch = require('node-fetch')

const talkToServer = (barcode, getManufacturers=false, productInfo=null) => {
    //set up URL logic
    var endPoint;
    var baseURL = "https://greenmap.herokuapp.com";
    
    if (getManufacturers) endPoint = `/products/${barcode}`;
    else endPoint = `/${barcode}`;

    let fullURL = baseURL + endPoint;
    console.log(`networking.js - the full URL is ${fullURL}`)

    //talk to the server
    var result = new Promise ((resolve, reject) => {
        console.log(`networking.js - Fetching...`)
        fetch(fullURL)
        .then(res => {

            // if there's a server error, reject the
            // Promise and pass along the server's status code
            if (!res.ok) {
                console.log(`networking.js - rejecting result Promise with ${res.status}`)
                reject(res.status)
            }
            console.log(`networking.js - returning res.json()`)
            return res.json()
        })
        .then(resJSON => {
            /*
            * if productInfo is not defined,
            * that means we're GETing from the first endpoint,
            * which returns it. So, we return productInfo to
            * getProductsAndManufacturers, which then passes
            * it back in its second call to this function
            * (talkToServer). This allows us to compose the 
            * final result object to return to the scanner/form 
            * component. The scanner/form then sends that object 
            * up to the redux store, where it can be read by 
            * the result component. 
            */
            console.log(`networking.js - resolving Promise with resJSON`)
            if (!productInfo) resolve(resJSON)
            else {
                console.log(`networking.js - building final result...`)
                //combine the results from the two endpoints
                result = {
                    "name": productInfo.name,
                    "category": resJSON.category,
                    "ESG": productInfo.ESG,
                    "topFive": resJSON.topFive
                }

                //resolve the Promise with the composed result
                console.log(`resolving with final result...`)
                resolve(result)
            } //end else
        }) //end .then

        //catch any errors and reject the Promise
        .catch(err => {
            console.log(`networking.js - rejecting Promise with ${err}`)
            reject(err)
        })
    }) //end Promise

    
    // A simple Prosmise that rejects after 5 seconds.
    // Promise.race() will return the error defined here
    // If the server goes not respond within 5 seconds.
    var connectionTimeout = new Promise ((reject) => {
        setTimeout(reject, 5000, Error("The connection timed out"))
    })

    //put a Promise.race() here
    return Promise.race([result, connectionTimeout])

} //end func

const getProductAndManufacturers = (barcode) => {
    return new Promise((resolve, reject) => {
        //first call gets the barcode info
        console.log(`GPAM - first talkToServer call`)
        talkToServer(barcode)
        
        //second call gets top 5 manufacturers
        .then(productInfo => {
            console.log(`GPAM - secondTalkToServer call`)
            talkToServer(barcode, getManufacturers=true, productInfo=productInfo)}
        )

        //now we send the final result back to the scanner/form,
        //which will dispatch an action to the redux store
        .then(result => {
            console.log(`GPAM, resolving with result`);
            resolve(result)
        })

        // catch any errors, re-throwing them with reject()
        // so they can be handled by the scanner/form. Those
        // components can react by dispatching a redux action;
        // we can't do that here.
        .catch(err => {
            console.log(`GPAM - rejecting with ${err}`)
            reject(err)
        })
    }) //end Promise
} //end func

const test = () => {
    getProductAndManufacturers(811571018420)
    .then(res => console.log(`tester - got a response: ${res}`))
    .catch(err => console.log(`tester - got an error: ${err}`))
}

test()
    

//export default getProductAndManufacturer
