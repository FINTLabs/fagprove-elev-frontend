import {Button, Modal, TextField} from "@navikt/ds-react";
import {useRef} from "react";
import {PersonPlusIcon} from "@navikt/aksel-icons";
import {useFetcher} from "@remix-run/react";

export default function AddElevButton() {
    const ref = useRef<HTMLDialogElement>(null);
    const fetcher = useFetcher();

    return (
        <div>
            <Button variant="secondary" icon={<PersonPlusIcon/>} onClick={() => ref.current?.showModal()}>Legg til
                elev</Button>

            <Modal ref={ref} header={{heading: "Legg til elev"}} width={400}>
                <Modal.Body>
                    <fetcher.Form method="post" id="skjema" className="flex gap-2 flex-col">
                        <TextField name="name" label="Fult Navn"/>
                        <TextField name="birthNumber" label="Fødselsnummer" inputMode="numeric" pattern="\d{11}"
                                   maxLength={11}/>
                        <TextField name="email" label="Email" type="email"/>
                        <TextField name="mobileNumber" label="Telefonnummer" inputMode="numeric" pattern="\d{8}"
                                   maxLength={8}/>
                        <TextField name="averageGrades" label="Karakter Gjenomsnitt" inputMode="decimal"
                                   pattern="^\d+(\.\d{1,2})?$"/>
                    </fetcher.Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button form="skjema" onClick={() => ref.current?.close()}>Send</Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => ref.current?.close()}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
