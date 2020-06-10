import Home from "../views/Home";

export default (joint) => {
    console.log(joint)
    return [
        {
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
}