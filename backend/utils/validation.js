function isValidText(value, minLength =0){
    return value && value.trim().length > minLength;

}
function isValidEmail(value){
    return value && value.includes('@')
}
function isValidImageUrl(value) {
    return value && value.startsWith('http');
}
function isValidAge(value, minLength = 0){
    return value && value > minLength
}

exports.isValidAge = isValidAge
exports.isValidImageUrl = isValidImageUrl
exports.isValidEmail = isValidEmail
exports.isValidText = isValidText