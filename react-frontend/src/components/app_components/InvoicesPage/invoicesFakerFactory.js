
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
companyId: faker.datatype.number(""),
itemId: faker.datatype.number(""),
quantity: faker.datatype.number(""),
subTotal: faker.datatype.number(""),
discount: faker.datatype.number(""),
total: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
