import {Button, Table} from "@navikt/ds-react";
import {PersonPlusIcon} from "@navikt/aksel-icons";

const data = [
    {
        name: "Jakobsen, Markus",
        birthNumber: 9543049930,
        email: "test@gmail.com",
        mobileNumber: 45399999,
        averageGrades: 4.23
    },
    {
        name: "Jakobsen, Markus",
        birthNumber: 9543049930,
        email: "test@gmail.com",
        mobileNumber: 45399999,
        averageGrades: 4.23
    },
    {
        name: "Jakobsen, Markus",
        birthNumber: 9543049930,
        email: "test@gmail.com",
        mobileNumber: 45399999,
        averageGrades: 4.23
    },
    {
        name: "Jakobsen, Markus",
        birthNumber: 9543049930,
        email: "test@gmail.com",
        mobileNumber: 45399999,
        averageGrades: 4.23
    },
];

const columns = [
    { name: "Navn", width: "20px" },
    { name: "Fødselsnummer", width: "1000px" },
    { name: "Email", width: "40px" },
    { name: "Telefonnummer", width: "200px" },
    { name: "Karakter Gjenomsnitt", width: "20px" },
];

export default function Elever() {
    return (
        <div className="p-5">
            <h2 className="font-bold text-3xl">Elever</h2>
            <Button icon={<PersonPlusIcon/>}>Legg til elev</Button>
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
