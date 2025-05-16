function lerp(a,b,t){
    return a+(b-a)*t
}// end of lerp



function scoreCalc(x, factor){
    if(x < 0){
        return 0
    }else{
        return x * factor
    }

}// end of scoreCalc