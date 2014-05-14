/*map start*/
if(seajs.production){
    seajs.config({
        alias: {
            "wolf-tpl": "wolf-app-path/wolf-tpl/src/wolf-tpl.js"
        },
        map : <%= mapJSON %>,
        debug: false
    });
}
/*map end*/
