import { ROUTES } from "../constants/routes";

// const endPoint = '/api/send-message';


export default async function sendMessageService (values, navigate) {

    console.log(values);
    navigate(ROUTES.USERS_ROUTE);

}