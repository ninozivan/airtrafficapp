/*

    AIR TRAFFIC APP - WHAT TO DO ORDER:
    1. Learn how "ADS-B Exchange API" works
    2. Create simple application that will get user geolocation
    3. Use geolocation and send/receive air traffic information from API
    4. After main functionalities are ready, create UI wireframes and html/css


    AIR TRAFFIC APP - Project flow

    "App.vue" is responsible for getting/updating Geolocation data and handling errors
        - "ListOfAirTraffic" is responsible for showing list of available air traffic based on users location (traffic in 100km radius from user)
            - "ModalSingleFlightDetails" is responsible for showing selected flight from list of all traffic
        - "WelcomeScreen" is used to explain to user why we need Geolocation

        error handling:
        - "ModalBrowserNotSupported" is used to inform user that his browser doesn't support Geolocation
        - "ModalError" is used to show error message when geolocation retreive failed
        - "ModalGeoPermissionDenied" is used to remind user that he blocked us from accessing geolocation

        - "OverlayLoader" is used for animating loading state when we have some proces in background



    //// !!! IMPORTANT
    How to start this application?
    If you are using localhost, then you must:
    1. use Chrome
    2. install extension "Allow-Control-Allow-Origin" for Chrome and activate it
    3. then you can bypass "ADS-B Exchange" API CORS security and then you can read data
        
    Othewise, you need to upload files from 'dist' folder to your server, but you must have https;

    If you don't have any other options, you can use json 'temp-response-from-adsbexchange.js' and try to read data from it.
    
*/