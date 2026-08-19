import { ClientResponseError } from "pocketbase";
import { i18n } from "../../i18n.js";

// {
//     originalRecord: undefined,
//     record: undefined,
//     field: undefined,
//     payload: {},
// }
export function onrecordsave(props) {
    try {
        const val = props.record[props.field.name];
        if (typeof val == "string") {
            JSON.parse(val);
        }
    } catch (err) {
        // simulate API error
        throw new ClientResponseError({
            status: 400,
            response: {
                message: i18n.t("json_field.invalid_json_data"),
                data: {
                    [props.field.name]: {
                        code: "invalid_json",
                        message: err.toString(),
                    },
                },
            },
        });
    }
}
