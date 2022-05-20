import {BASE_URI} from "@/store/config";

export default {
    namespaced: true,
    actions: {
        async getCountries() {
            const response = await fetch(BASE_URI + 'city');
            if (response.ok) {
                return await response.json();
            }
            return []
        },
    }
}