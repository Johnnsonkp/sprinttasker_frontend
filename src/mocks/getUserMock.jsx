export const getUserMock = () => {

    const formData = {
        name: "test",
        username: "test@gmail.com",
        password: "0000",
        email: "test@gamil.com" 
    }
    // return (
    //     {formData}
    // )
    // const [userData] = formData

    // React.useEffect(() => {
    //     if (userData) {
    //         const { token, user } = userData;
    //         dispatch({
    //             type: "auth",
    //             payload: {
    //             token,
    //             user_id: user.id,
    //             name: user.name,
    //             username: user.username,
    //             email: user.email,
    //             },
    //         });
    //     }
    // }, [userData]);

    // const actions = {
    //     signup: () => {
    //     return fetch(state.url + "/users", {
    //         method: "post",
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(userData),
    //     }).then((response) => response.json());
    //     },
    //     login: () => {
    //     console.log("State url", state.url);
    //     return fetch(state.url + "/login", {
    //         method: "post",
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(userData),
    //     }).then((response) => response.json());
    //     },
    // };

    // const handleSubmit = () => {
    //     return (
    //         actions[signup]().then((data) => {
    //             setUserData(data);
    //             return data
    //         })
    //     )
    // }

    // const submitedData = () => {
    //     return handleSubmit()
    // }
    // return ({actions[signUp]})
};