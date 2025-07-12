import { DefaultService } from "./generated";

const main = async () => {
    const res = await DefaultService.getUsers('1234');
    console.log('res:', res);
}

main();