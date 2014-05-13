/*map start*/
if(seajs.production){
    seajs.config({
        alias: {
            "wolf-tpl": "wolf-app/wolf-tpl/src/wolf-tpl.js"
        },
        map : <%= mapJSON %>,
        debug: false
    });
}
/*map end*/
