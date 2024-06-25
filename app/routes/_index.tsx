import AddElevButton from "~/components/elever/AddElevButton";
import ElevTable from "~/components/elever/ElevTable";
import DeleteAllElevButton from "~/components/elever/DeleteAllElevButton";
import process from "process";
import { json } from "@remix-run/react";
import ElevApi from "~/api/ElevApi";

const createElev = (formData) => {
    return {
        id: formData.get("id"),
        name: formData.get("name"),
        birthNumber: formData.get("birthNumber"),
        email: formData.get("email"),
        mobileNumber: formData.get("mobileNumber"),
        averageGrades: formData.get("averageGrades"),
    }
}

export const action = async ({ request }) => {
    const cookies = request.headers.get("cookie");
    const elevApi = new ElevApi(cookies);


    try {
        const formData = await request.formData();

        if (request.method === "PUT") {
            const updatedElev = createElev(formData)
            console.log("Updating elev:", updatedElev);
            const data = await elevApi.updateElev(updatedElev);
            return json(data);
        }

        if (request.method === "POST") {
            const newElev = createElev(formData)
            const data = await elevApi.addElev(newElev);
            return json(data);
        }

        if (request.method === "DELETE") {
            const deleteType = formData.get("_method")
            if (deleteType === "deleteById") {
                const deleteId = formData.get("id")
                const data = await elevApi.deleteById(deleteId);
                return json(data);
            } else {
                const data = await elevApi.deleteAllElevs();
                return json(data);
            }
        }
    } catch (error) {
        console.error("Action error:", error);
        return json({ error: error.message }, { status: 500 });
    }
};

export const loader = async ({ request }) => {
    const base_url = process.env.BASE_URL || "http://localhost:8080";
    const cookies = request.headers.get("cookie");

    console.log(`Base URL: ${base_url}`);
    console.log(`Cookies: ${cookies}`);

    try {
        const response = await fetch(base_url + "/api/elev", {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'cookie': cookies,
                'Authorization': "Bearer " + process.env.BEARER_TOKEN
            }
        });

        console.log(`Status Code: ${response.status}`);

        if (!response.ok) {
            console.log(`Response not ok: ${response.statusText}`);
            return json({ error: response.statusText }, { status: response.status });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }
};

export default function Index() {
    return (
        <div className="p-5 flex flex-col gap-4">
            <h2 className="font-bold text-3xl">Elever</h2>
            <div className="flex gap-2">
                <AddElevButton />
                <DeleteAllElevButton />
            </div>
            <ElevTable />
        </div>
    );
}