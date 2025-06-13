export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.result.token)

    if (user && user.result.token) {
        return { Authorization: 'Bearer ' + user.result.token };
    } else {
        return {};
    }
}