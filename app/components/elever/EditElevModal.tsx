import {Button, Modal, TextField} from "@navikt/ds-react";
import {useState} from "react";
import {useFetcher} from "@remix-run/react";

export default function EditElevModal({editOpen, setEditOpen, row}) {
    const [formData, setFormData] = useState(row);
    const fetcher = useFetcher();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    return (
        <Modal onClose={() => setEditOpen(false)} open={editOpen} header={{heading: `Redigerer ${row.name}`}} width={400}>
            <Modal.Body>
                <fetcher.Form method="put" id="update">
                    <input type="hidden" name="id" value={formData.id || ""}/>
                    <TextField name="name" label="Fult Navn" value={formData.name} onChange={handleInputChange}/>
                    <TextField name="birthNumber" label="Fødselsnummer" inputMode="numeric" pattern="\d{11}"
                               maxLength={11} value={formData.birthNumber} onChange={handleInputChange}/>
                    <TextField name="email" label="Email" type="email" value={formData.email}
                               onChange={handleInputChange}/>
                    <TextField name="mobileNumber" label="Telefonnummer" inputMode="numeric" pattern="\d{8}"
                               maxLength={8} value={formData.mobileNumber} onChange={handleInputChange}/>
                    <TextField name="averageGrades" label="Karakter Gjenomsnitt" inputMode="decimal"
                               pattern="^\d+(\.\d{1,2})?$" value={formData.averageGrades}
                               onChange={handleInputChange}/>
                </fetcher.Form>
            </Modal.Body>
            <Modal.Footer>
                <Button form="update" onClick={() => setEditOpen(false)}>Oppdater</Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setEditOpen(false)}
                >
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    )
}