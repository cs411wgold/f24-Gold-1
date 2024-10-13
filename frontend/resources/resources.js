// reference for exit alert https://www.sitepoint.com/community/t/confirm-exit-of-page/2090/3
function exitAlert(){
    if(confirm('You are about to leave this site.')){
        return true;
    } else {
        if(window.event) {
            window.event.returnValue = false;
        } else {
            exitAlert.preventDefault()
        }
        return false;
    }
}