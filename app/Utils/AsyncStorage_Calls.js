import AsyncStorage from '@react-native-async-storage/async-storage';


var ASO = function () { };

ASO.prototype.setTokenJWT = function (key, value, callBack) {

    AsyncStorage.setItem('Jonna$:' + key, JSON.stringify(value), (err) => {
        if (err) {
            callBack('Error setting token', false);
        }
        else {
            callBack(null, true);
            console.log("setTokenJWT ")
        }
    });
};



ASO.prototype.getTokenJWT = function (key, callBack) {
    AsyncStorage.getItem('Jonna$:' + key, (err, result) => {
        if (err) {
            callBack('Error getting token', null);
        } else {
            callBack(null, result ? JSON.parse(result) : null);
        }
    });
};






ASO.prototype.RemoveTokenJWT = function (key, callBack) {
    AsyncStorage.removeItem('Jonna$:' + key, (err) => {
        if (err) {
            callBack('Error removing token', false);
        } else {
            callBack(null, true);
            // console.log("Token removed successfully");
        }
    });
};

export default new ASO();
