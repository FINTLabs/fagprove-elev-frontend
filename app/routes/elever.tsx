import {Table} from "@navikt/ds-react";
import {json} from "@remix-run/react";
import {useLoaderData} from "react-router";
import AddElevButton from "~/components/elever/AddElevButton";
import * as process from "process";

export const loader = async () => {
    const base_url = process.env.BASE_URL || "http://localhost:8080";
    try {
        const response = await fetch(base_url + "/api/elev", {
            method: 'GET'
        });

        if (!response.ok) {
            console.error('Network response was not ok', response.status, response.statusText);
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            return json(data);
        } else {
            const text = await response.text();
            console.error('Response was not JSON:', text);
            throw new Error('Response was not JSON: ' + text);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Response('Error fetching data: ' + error.message, { status: 500 });
    }
};

const columns = [
    {name: "Navn", width: "100px"},
    {name: "Fødselsnummer", width: "200px"},
    {name: "Email", width: "100px"},
    {name: "Telefonnummer", width: "100px"},
    {name: "Karakter Gjenomsnitt", width: "40px"},
];

export default function Elever() {
    const data = useLoaderData<typeof loader>();
    return (
        <div className="p-5">
            <h2 className="font-bold text-3xl">Elever</h2>
            <AddElevButton/>
            <Table>
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => {
                            return (
                                <Table.HeaderCell key={column.name} scope="col">
                                    {column.name}
                                </Table.HeaderCell>
                            )
                        })}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((row, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.HeaderCell scope="row">{row.name}</Table.HeaderCell>
                                <Table.DataCell>{row.birthNumber}</Table.DataCell>
                                <Table.DataCell>{row.email}</Table.DataCell>
                                <Table.DataCell>{row.mobileNumber}</Table.DataCell>
                                <Table.DataCell>{row.averageGrades}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
}
