import {Pagination, Table} from "@navikt/ds-react";
import {useState} from "react";
import process from "process";
import {json} from "@remix-run/react";
import {useLoaderData} from "react-router";

export const loader = async ({ request }) => {
    const base_url = process.env.BASE_URL || "http://localhost:8081";
    const cookies = request.headers.get("cookie");

    console.log(`Base URL: ${base_url}`);
    console.log(`Cookies: ${cookies}`);

    try {
        const response = await fetch(base_url + "/api/status/actionlog", {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'cookie': cookies,
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

export default function Log() {
    const data = useLoaderData<typeof loader>();
    const [page, setPage] = useState(1);
    const rowsPerPage = 15;

    let sortData = data;
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <div className="grid gap-4 p-5">
            <h2 className="font-bold text-3xl">Hendelselog</h2>
            <Table className="mt-4" size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">id</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Email</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Hendelse</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Dato</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortData.map((row, i) => {
                        return (
                            <Table.Row key={i + row.id}>
                                <Table.HeaderCell scope="row">{row.id}</Table.HeaderCell>
                                <Table.HeaderCell scope="row">{row.username}</Table.HeaderCell>
                                <Table.DataCell>{row.action}</Table.DataCell>
                                <Table.DataCell>{row.timestamp}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <Pagination
                page={page}
                onPageChange={setPage}
                count={Math.ceil(data.length / rowsPerPage)}
                size="small"
            />
        </div>
    );
};