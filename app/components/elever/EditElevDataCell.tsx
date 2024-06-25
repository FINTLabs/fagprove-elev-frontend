import {useState} from "react";
import {Button, Dropdown, HStack, Table} from "@navikt/ds-react";
import {CogIcon} from "@navikt/aksel-icons";
import EditElevModal from "~/components/elever/EditElevModal";
import DeleteElevModal from "~/components/elever/DeleteElevModal";

export default function EditElevDataCell({row, index}) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <Table.DataCell align="right">
                <Dropdown defaultOpen={index === 0}>
                    <HStack justify="middle">
                        <Button
                            as={Dropdown.Toggle}
                            icon={<CogIcon title="Meny"/>}
                            size="medium"
                            variant="tertiary"
                        />
                    </HStack>
                    <Dropdown.Menu>
                        <Dropdown.Menu.GroupedList>
                            <Dropdown.Menu.GroupedList.Item onClick={() => setEditOpen(true)}>
                                Rediger
                            </Dropdown.Menu.GroupedList.Item>
                            <Dropdown.Menu.GroupedList.Item onClick={() => setDeleteOpen(true)}>
                                Slett
                            </Dropdown.Menu.GroupedList.Item>
                        </Dropdown.Menu.GroupedList>
                    </Dropdown.Menu>
                </Dropdown>
            </Table.DataCell>
            <DeleteElevModal deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} id={row.id} />
            <EditElevModal editOpen={editOpen} setEditOpen={setEditOpen} row={row}/>
        </>
    );
}
