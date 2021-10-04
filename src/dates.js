function lastDays() {
    return '0123456'.split('').map(function (n) {
        var d = new Date();
        d.setDate(d.getDate() - n);

        return (function (day, month, year) {
            return [year, month < 10 ? '0' + month : month, day < 10 ? '0' + day : day].join('-');
        })(d.getDate(), d.getMonth(), d.getFullYear());
    }).join(',');
}
let days = lastDays().split(',')

export default days;