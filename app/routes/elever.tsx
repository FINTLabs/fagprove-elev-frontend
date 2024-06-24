import {Table} from "@navikt/ds-react";

const data = [
    {
        name: "Jakobsen, Markus",
        percent: 100,
    },
    {
        name: "Halvorsen, Mari",
        percent: 50,
    },
    {
        name: "Christiansen, Mathias",
        percent: 95,
    },
    {
        name: "Fredriksen, Leah",
        percent: 100,
    },
    {
        name: "Evensen, Jonas",
        percent: 9,
    },
];

export default function Elever() {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Fødselsnummer</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Telefonnummer</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Karakter Gjenomsnitt</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table>
    )
}