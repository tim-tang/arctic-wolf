/*production start*/
if(seajs.production){
    seajs.config({
        alias: <%= aliasJSON %>,
        map: <%= mapJSON %>,
        debug: false
    });
}
/*production end*/
