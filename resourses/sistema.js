//const urlServer = "http://127.0.0.1:5000/";
const urlServer = "https://torresdev-backend.onrender.com/";

const Sistema = (()=> {
    const public = {};
    
    function getParamUrl(param="") {
        const urlParams = window.location.search.substring(window.location.search.indexOf("?") + 1).split("&");
        for (let i = 0; i < urlParams.length; i++) {
            const paramUrl = urlParams[i];
            if (paramUrl.includes(param+"=")) {
                return paramUrl.substring(paramUrl.indexOf("=")+1);
            }
        }
        return null;
    }

    public.getParamUrl = getParamUrl;
    return public;
})()
