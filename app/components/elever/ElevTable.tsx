import {Table} from "@navikt/ds-react";
import {useLoaderData} from "react-router";
import {loader} from "~/routes/_index";
import EditElevDataCell from "~/components/elever/EditElevDataCell";


const columns = [
    {name: "Navn", width: "100px"},
    {name: "Fødselsnummer", width: "200px"},
    {name: "Email", width: "100px"},
    {name: "Telefonnummer", width: "100px"},
    {name: "Karakter Gjenomsnitt", width: "40px"},
    {name: "Handlinger", width: "20px"}
];

export default function ElevTable() {
    const data = useLoaderData<typeof loader>();
    console.log(data)
    const rows = data || [];

    return (
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
                {rows.map((row, i) => {
                    return (
                        <Table.Row key={i}>
                            <Table.HeaderCell>{row.name}</Table.HeaderCell>
                            <Table.DataCell>{row.birthNumber}</Table.DataCell>
                            <Table.DataCell>{row.email}</Table.DataCell>
                            <Table.DataCell>{row.mobileNumber}</Table.DataCell>
                            <Table.DataCell>{row.averageGrades}</Table.DataCell>
                            <EditElevDataCell row={row} index={i}/>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    )
}