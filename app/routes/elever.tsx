import {Table} from "@navikt/ds-react";
import {json} from "@remix-run/react";
import {useLoaderData} from "react-router";
import * as process from "process";
import AddElevButton from "~/components/elever/AddElevButton";

export const loader = async () => {
    const token = process.env.BEARER_TOKEN
    if (!token) {
        throw new Error("Bearer token is not defined in the environment variables");
    }
    const response = await fetch("http://localhost:8080/elev", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Response("Failed to fetch data", {status: response.status});
    }
    const data = await response.json();
    return json(data);
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
